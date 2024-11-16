import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';

import { getConfig } from '@edx/frontend-platform';
import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

let themeCookie = 'indigo-toggle-dark';
let themeCookieExpiry = 90; // days

const AddDarkTheme = () => {
  const cookies = new Cookies();
  const isThemeToggleEnabled = getConfig().INDIGO_ENABLE_DARK_TOGGLE;

  const getCookieExpiry = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + themeCookieExpiry);
  };

  const getCookieOptions = () => {
    const serverURL = new URL(getConfig().LMS_BASE_URL);
    const options = { domain: serverURL.hostname, path: '/', expires: getCookieExpiry() };
    return options;
  };

  useEffect(() => {
    const theme =  cookies.get(themeCookie);
    if (isThemeToggleEnabled && theme === 'dark') {
      document.body.classList.add('indigo-dark-theme');
      cookies.set(themeCookie, theme, getCookieOptions());      //  on page load, update expiry
    }
  }, []);

  return (<div />);
};

const themePluginSlot = {
  keepDefault: false,
  plugins: [
    {
      op: PLUGIN_OPERATIONS.Hide,
      widgetId: 'default_contents',
    },
    {
      op: PLUGIN_OPERATIONS.Insert,
      widget: {
        id: 'custom_footer',
        type: DIRECT_PLUGIN,
        RenderWidget: () => (
          <div class="wrapper wrapper-footer p-4">
            <footer id="footer" class="tutor-container text-left">
              <h5>EITS-USEK</h5>
              <span class="copyright-site">Copyrights ©2024. All Rights Reserved.</span>
            </footer>
          </div>
        ),
      },
    },
  ],
};

const config = {
  pluginSlots: {
    footer_slot: themePluginSlot,
  },
};

export default config;
