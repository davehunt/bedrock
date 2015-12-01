# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

import pytest

VIEWPORT = {
    'desktop': {'width': 1280, 'height': 1024},
    'mobile': {'width': 320, 'height': 480}}


@pytest.fixture(scope='session')
def capabilities(capabilities):
    capabilities.setdefault('tags', []).append('bedrock')
    return capabilities


@pytest.fixture
def selenium(request, selenium):
    capabilities = selenium.capabilities
    if request.keywords.get('include') is not None:
        include = request.keywords.get('include').args[0]
        if not all(item in capabilities.items() for item in include.items()):
            message = 'Required capabilities {0} not found in {1}'.format(include, capabilities)
            pytest.skip(message)
    if request.keywords.get('exclude') is not None:
        exclude = request.keywords.get('exclude').args[0]
        if any(item in capabilities.items() for item in exclude.items()):
            message = 'Prohibited capabilities {0} found in {1}'.format(exclude, capabilities)
            pytest.skip(message)
    viewport = VIEWPORT['desktop']
    if request.keywords.get('viewport') is not None:
        viewport = VIEWPORT[request.keywords.get('viewport').args[0]]
    selenium.set_window_size(viewport['width'], viewport['height'])
    return selenium
