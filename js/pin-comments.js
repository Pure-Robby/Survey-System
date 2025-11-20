(() => {
    // --- Supabase init ---
    const SUPABASE_URL = 'https://pqtrlpqwsttklkiwevls.supabase.co'; 
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxdHJscHF3c3R0a2xraXdldmxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNDA5NTIsImV4cCI6MjA3ODYxNjk1Mn0.oVipVbIkSpWK4edPnqPYhvMseAOxZI7xst9AoWEupZg';
    const APP_ID = 'survey-system-poc'; // change per project/prototype
  
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
    // --- Widget state ---
    const HIT_RADIUS = 16;
    const state = { enabled:false, pins:[], openId:null };
    const root = document.body;
    const toolbarBtn = document.getElementById('pinToggle');
    const statusEl = document.getElementById('pinStatus');
  
    const pinEls = new Map();  // id -> pin element
    const popEls = new Map();  // id -> pop element
  
    function currentPageKey() {
      // Use pathname + hash so one prototype can have multiple "screens"
      return location.pathname + (location.hash || '');
    }
  
    // --- Load pins from Supabase on init ---
    loadPins();
  
    async function loadPins() {
      const { data, error } = await supabase
        .from('page_comments')
        .select('*')
        .eq('app_id', APP_ID)
        .eq('url', currentPageKey())
        .order('created_at', { ascending: true });
  
      if (error) {
        console.error('Error loading pins', error);
        return;
      }
  
      state.pins = (data || []).map(doc => ({
        id: doc.id,
        x: Number(doc.x),
        y: Number(doc.y),
        text: doc.text || '',
        author: doc.author || ''
      }));
  
      state.pins.forEach(p => addPinEl(p));
    }
  
    // --- Toolbar toggle ---
    toolbarBtn.onclick = () => {
      state.enabled = !state.enabled;
      toolbarBtn.textContent = state.enabled ? 'Disable Comment Mode' : 'Enable Comment Mode';
      statusEl.textContent = state.enabled ? 'on' : 'off';
    };
  
    // Close pop when clicking away (only in view mode)
    document.addEventListener('click', (e) => {
      const inPop = e.target.closest('.pin-pop');
      const inPin = e.target.closest('.pin');
      const inToolbar = e.target.closest('.pin-toolbar');
      if (inPop || inPin || inToolbar) return;
  
      if (state.enabled) return; // don’t auto-close while in comment mode
      closeOpenPop();
    });
  
    // Main click handler
    root.addEventListener('click', async (e) => {
      if (!state.enabled) return;
  
      // Ignore clicks inside our UI
      if (e.target.closest('.pin-pop, .pin-toolbar, .pin')) return;
  
      const { pageX, pageY } = e;
  
      // 1) Hitbox: toggle nearest pin if close enough
      const near = findNearbyPin(pageX, pageY, HIT_RADIUS);
      if (near) {
        togglePin(near.id);
        return;
      }
  
      // 2) Otherwise create a new Supabase-backed pin
      const pin = await createPin(pageX, pageY);
      if (!pin) return; // error handled in createPin
      state.pins.push(pin);
      addPinEl(pin, { open: true });
    });
  
    // --- Supabase CRUD helpers ---
  
    async function createPin(x, y) {
      const { data, error } = await supabase
        .from('page_comments')
        .insert({
          app_id: APP_ID,
          url: currentPageKey(),
          x,
          y,
          text: '',
          author: null
        })
        .select()
        .single();
  
      if (error) {
        console.error('Error creating pin', error);
        return null;
      }
  
      return {
        id: data.id,
        x: Number(data.x),
        y: Number(data.y),
        text: data.text || '',
        author: data.author || ''
      };
    }
  
    async function savePinText(pin, newText) {
      const { error } = await supabase
        .from('page_comments')
        .update({
          text: newText,
          updated_at: new Date().toISOString()
        })
        .eq('id', pin.id);
  
      if (error) {
        console.error('Error updating pin', error);
      } else {
        pin.text = newText;
      }
    }
  
    async function deletePin(pinId) {
      const { error } = await supabase
        .from('page_comments')
        .delete()
        .eq('id', pinId);
  
      if (error) {
        console.error('Error deleting pin', error);
      }
    }
  
    // --- UI helpers ---
  
    function addPinEl(pin, opts={}) {
      const pinEl = document.createElement('div');
      pinEl.className = 'pin';
      positionEl(pinEl, pin.x, pin.y);
  
      const pop = document.createElement('div');
      pop.className = 'pin-pop';
      positionEl(pop, pin.x + 18, pin.y + 18);
      pop.innerHTML = `
        <textarea placeholder="Leave feedback..."></textarea>
        <div style="display:flex; gap:8px; margin-top:8px; justify-content:flex-end">
          <button data-act="delete" style="all:unset; color:#ef4444; cursor:pointer">Delete</button>
          <button data-act="save" style="all:unset; color:#10b981; cursor:pointer">Save</button>
        </div>
      `;
  
      const ta = pop.querySelector('textarea');
      ta.value = pin.text || '';
  
      pinEl.addEventListener('click', (ev) => {
        ev.stopPropagation();
        togglePin(pin.id);
      });
  
      pop.addEventListener('click', (ev) => ev.stopPropagation());
  
      pop.querySelector('[data-act="save"]').onclick = async () => {
        const newText = ta.value.trim();
        await savePinText(pin, newText);
        closeOpenPop();
      };
  
      pop.querySelector('[data-act="delete"]').onclick = async () => {
        await deletePin(pin.id);
        state.pins = state.pins.filter(p => p.id !== pin.id);
        if (state.openId === pin.id) state.openId = null;
        pinEl.remove();
        pop.remove();
        pinEls.delete(pin.id);
        popEls.delete(pin.id);
      };
  
      pinEls.set(pin.id, pinEl);
      popEls.set(pin.id, pop);
  
      root.appendChild(pinEl);
      root.appendChild(pop);
  
      if (opts.open) {
        openPin(pin.id);
        setTimeout(() => ta.focus(), 0);
      } else {
        pop.style.display = 'none';
      }
  
      // Simple sync on scroll/resize (keeps pop near the pin)
      window.addEventListener('scroll', () => syncPositions(pin), { passive:true });
      window.addEventListener('resize', () => syncPositions(pin));
    }
  
    function positionEl(el, x, y) {
      el.style.left = x + 'px';
      el.style.top = y + 'px';
    }
  
    function syncPositions(pin) {
      const pinEl = pinEls.get(pin.id);
      const pop = popEls.get(pin.id);
      if (!pinEl || !pop) return;
      positionEl(pinEl, pin.x, pin.y);
      positionEl(pop, pin.x + 18, pin.y + 18);
    }
  
    function openPin(id) {
      closeOpenPop();
      const pinEl = pinEls.get(id);
      const pop = popEls.get(id);
      if (!pinEl || !pop) return;
      pinEl.classList.add('is-active');
      pop.style.display = 'block';
      state.openId = id;
    }
  
    function closeOpenPop() {
      if (!state.openId) return;
      const pinEl = pinEls.get(state.openId);
      const pop = popEls.get(state.openId);
      if (pinEl) pinEl.classList.remove('is-active');
      if (pop) pop.style.display = 'none';
      state.openId = null;
    }
  
    function togglePin(id) {
      if (state.openId === id) {
        closeOpenPop();
      } else {
        openPin(id);
      }
    }
  
    function findNearbyPin(x, y, radius) {
      let closest = null;
      let minD2 = radius * radius;
      for (const pin of state.pins) {
        const dx = x - pin.x;
        const dy = y - pin.y;
        const d2 = dx*dx + dy*dy;
        if (d2 <= minD2) {
          closest = pin;
          minD2 = d2;
        }
      }
      return closest;
    }
  
    // optional: simple export from current page/prototype
    window.exportPins = () => JSON.stringify({
      appId: APP_ID,
      url: currentPageKey(),
      pins: state.pins
    });
  })();