# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select

from .page import Page, PageRegion


class BasePage(Page):

    @property
    def footer(self):
        return self.Footer(self.selenium)

    class Footer(PageRegion):

        _root_locator = (By.ID, 'colophon')
        _language_locator = (By.ID, 'language')

        @property
        def language(self):
            el = self.root.find_element(*self._language_locator)
            return Select(el).first_selected_option.get_attribute('value')

        @property
        def languages(self):
            el = self.root.find_element(*self._language_locator)
            return [o.get_attribute('value') for o in Select(el).options]

        def select_language(self, value):
            el = self.root.find_element(*self._language_locator)
            Select(el).select_by_value(value)
