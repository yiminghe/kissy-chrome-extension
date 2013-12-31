// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
KISSY.add(function (S, require) {
    var QUERY = 'kittens';
    var IO = require('io');
    var Dom = require('dom');

    var kittenGenerator = {
        imgTpl: '<img src="{src}" alt="{alt}"/>',

        kittenTpl: 'http://farm{farm}.static.flickr.com/{server}/{id}_{secret}_s.jpg',
        /**
         * Flickr URL that will give us lots and lots of whatever we're looking for.
         *
         * See http://www.flickr.com/services/api/flickr.photos.search.html for
         * details about the construction of this URL.
         */
        searchParams: {
            method: 'flickr.photos.search',
            'api_key': '90485e931f687a9b9c2a66bf58a3861a',
            text: QUERY,
            'safe_search': 1,
            'content_type': 1,
            sort: 'interestingness-desc',
            'per_page': 20
        },
        /**
         * Sends an XHR GET request to grab photos of lots and lots of kittens. The
         * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
         *
         * @public
         */
        requestKittens: function () {
            /**
             * Flickr URL that will give us lots and lots of whatever we're looking for.
             *
             * See http://www.flickr.com/services/api/flickr.photos.search.html for
             * details about the construction of this URL.
             */
            IO({
                // allow cross domain request, yeah
                url: 'https://secure.flickr.com/services/rest/',
                headers: {
                    'X-Requested-With': false
                },
                data: this.searchParams,
                success: this.showPhotos_.bind(this)
            });
        },

        /**
         * Handle the 'onload' event of our kitten XHR request, generated in
         * 'requestKittens', by generating 'img' elements, and stuffing them into
         * the document for display.
         *
         * @private
         */
        showPhotos_: function (xml) {
            var kittens = xml.querySelectorAll('photo');
            var html = '';
            for (var i = 0; i < kittens.length; i++) {
                html += S.substitute(this.imgTpl, {
                    src: this.constructKittenURL_(kittens[i]),
                    alt: kittens[i].getAttribute('title')
                });
            }
            Dom.append(Dom.create(html), document.body);
        },

        /**
         * Given a photo, construct a URL using the method outlined at
         * http://www.flickr.com/services/api/misc.urlKittenl
         * @private
         */
        constructKittenURL_: function (photo) {
            return S.substitute(this.kittenTpl, {
                farm: photo.getAttribute('farm'),
                server: photo.getAttribute('server'),
                id: photo.getAttribute('id'),
                secret: photo.getAttribute('secret')
            });
        }
    };

    return {
        init: function () {
            // Run our kitten generation script as soon as the document's DOM is ready.
            kittenGenerator.requestKittens();
        }
    };
});