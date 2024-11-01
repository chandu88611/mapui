/*
Tagify v4.26.5 - tags input component
By: Yair Even-Or <vsync.design@gmail.com>
https://github.com/yairEO/tagify

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

This Software may not be rebranded and sold as a library under any other name
other than "Tagify" (by owner) or as part of another library.
*/

!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Tagify = e()
}(this, (function() {
    "use strict";
    var t = "&#8203;";
    function e(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++)
            n[i] = t[i];
        return n
    }
    function i(t) {
        return function(t) {
            if (Array.isArray(t))
                return e(t)
        }(t) || function(t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"])
                return Array.from(t)
        }(t) || function(t, i) {
            if (!t)
                return;
            if ("string" == typeof t)
                return e(t, i);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n)
                return Array.from(n);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
                return e(t, i)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    var n = {
        isEnabled: function() {
            var t;
            return null === (t = window.TAGIFY_DEBUG) || void 0 === t || t
        },
        log: function() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
                e[n] = arguments[n];
            var s;
            this.isEnabled() && (s = console).log.apply(s, ["[Tagify]:"].concat(i(e)))
        },
        warn: function() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
                e[n] = arguments[n];
            var s;
            this.isEnabled() && (s = console).warn.apply(s, ["[Tagify]:"].concat(i(e)))
        }
    }
      , s = function(t, e, i, n) {
        return t = "" + t,
        e = "" + e,
        n && (t = t.trim(),
        e = e.trim()),
        i ? t == e : t.toLowerCase() == e.toLowerCase()
    }
      , a = function(t, e) {
        return t && Array.isArray(t) && t.map((function(t) {
            return o(t, e)
        }
        ))
    };
    function o(t, e) {
        var i, n = {};
        for (i in t)
            e.indexOf(i) < 0 && (n[i] = t[i]);
        return n
    }
    function r(t) {
        var e = document.createElement("div");
        return t.replace(/\&#?[0-9a-z]+;/gi, (function(t) {
            return e.innerHTML = t,
            e.innerText
        }
        ))
    }
    function l(t) {
        return (new DOMParser).parseFromString(t.trim(), "text/html").body.firstElementChild
    }
    function d(t, e) {
        for (e = e || "previous"; t = t[e + "Sibling"]; )
            if (3 == t.nodeType)
                return t
    }
    function c(t) {
        return "string" == typeof t ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/`|'/g, "&#039;") : t
    }
    function u(t) {
        var e = Object.prototype.toString.call(t).split(" ")[1].slice(0, -1);
        return t === Object(t) && "Array" != e && "Function" != e && "RegExp" != e && "HTMLUnknownElement" != e
    }
    function g(t, e, i) {
        var n, s;
        function a(t, e) {
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    if (u(e[i])) {
                        u(t[i]) ? a(t[i], e[i]) : t[i] = Object.assign({}, e[i]);
                        continue
                    }
                    if (Array.isArray(e[i])) {
                        t[i] = Object.assign([], e[i]);
                        continue
                    }
                    t[i] = e[i]
                }
        }
        return n = t,
        (null != (s = Object) && "undefined" != typeof Symbol && s[Symbol.hasInstance] ? s[Symbol.hasInstance](n) : n instanceof s) || (t = {}),
        a(t, e),
        i && a(t, i),
        t
    }
    function h() {
        var t = []
          , e = {}
          , i = !0
          , n = !1
          , s = void 0;
        try {
            for (var a, o = arguments[Symbol.iterator](); !(i = (a = o.next()).done); i = !0) {
                var r = a.value
                  , l = !0
                  , d = !1
                  , c = void 0;
                try {
                    for (var g, h = r[Symbol.iterator](); !(l = (g = h.next()).done); l = !0) {
                        var p = g.value;
                        u(p) ? e[p.value] || (t.push(p),
                        e[p.value] = 1) : t.includes(p) || t.push(p)
                    }
                } catch (t) {
                    d = !0,
                    c = t
                } finally {
                    try {
                        l || null == h.return || h.return()
                    } finally {
                        if (d)
                            throw c
                    }
                }
            }
        } catch (t) {
            n = !0,
            s = t
        } finally {
            try {
                i || null == o.return || o.return()
            } finally {
                if (n)
                    throw s
            }
        }
        return t
    }
    function p(t) {
        return String.prototype.normalize ? "string" == typeof t ? t.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : void 0 : t
    }
    var f = function() {
        return /(?=.*chrome)(?=.*android)/i.test(navigator.userAgent)
    };
    function m() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (function(t) {
            return (t ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> t / 4).toString(16)
        }
        ))
    }
    function v(t) {
        return t && t.classList && t.classList.contains(this.settings.classNames.tag)
    }
    function b(t) {
        return t && t.closest(this.settings.classNames.tagSelector)
    }
    function y(t, e) {
        var i = window.getSelection();
        return e = e || i.getRangeAt(0),
        "string" == typeof t && (t = document.createTextNode(t)),
        e && (e.deleteContents(),
        e.insertNode(t)),
        t
    }
    function w(t, e, i) {
        return t ? (e && (t.__tagifyTagData = i ? e : g({}, t.__tagifyTagData || {}, e)),
        t.__tagifyTagData) : (n.warn("tag element doesn't exist", {
            tagElm: t,
            data: e
        }),
        e)
    }
    function T(t) {
        if (t && t.parentNode) {
            var e = t
              , i = window.getSelection()
              , n = i.getRangeAt(0);
            i.rangeCount && (n.setStartAfter(e),
            n.collapse(!0),
            i.removeAllRanges(),
            i.addRange(n))
        }
    }
    function O(t, e) {
        t.forEach((function(t) {
            if (w(t.previousSibling) || !t.previousSibling) {
                var i = document.createTextNode("​");
                t.before(i),
                e && T(i)
            }
        }
        ))
    }
    var x = {
        delimiters: ",",
        pattern: null,
        tagTextProp: "value",
        maxTags: 1 / 0,
        callbacks: {},
        addTagOnBlur: !0,
        addTagOn: ["blur", "tab", "enter"],
        onChangeAfterBlur: !0,
        duplicates: !1,
        whitelist: [],
        blacklist: [],
        enforceWhitelist: !1,
        userInput: !0,
        focusable: !0,
        keepInvalidTags: !1,
        createInvalidTags: !0,
        mixTagsAllowedAfter: /,|\.|\:|\s/,
        mixTagsInterpolator: ["[[", "]]"],
        backspace: !0,
        skipInvalid: !1,
        pasteAsTags: !0,
        editTags: {
            clicks: 2,
            keepInvalid: !0
        },
        transformTag: function() {},
        trim: !0,
        a11y: {
            focusableTags: !1
        },
        mixMode: {
            insertAfterTag: " "
        },
        autoComplete: {
            enabled: !0,
            rightKey: !1,
            tabKey: !1
        },
        classNames: {
            namespace: "tagify",
            mixMode: "tagify--mix",
            selectMode: "tagify--select",
            input: "tagify__input",
            focus: "tagify--focus",
            tagNoAnimation: "tagify--noAnim",
            tagInvalid: "tagify--invalid",
            tagNotAllowed: "tagify--notAllowed",
            scopeLoading: "tagify--loading",
            hasMaxTags: "tagify--hasMaxTags",
            hasNoTags: "tagify--noTags",
            empty: "tagify--empty",
            inputInvalid: "tagify__input--invalid",
            dropdown: "tagify__dropdown",
            dropdownWrapper: "tagify__dropdown__wrapper",
            dropdownHeader: "tagify__dropdown__header",
            dropdownFooter: "tagify__dropdown__footer",
            dropdownItem: "tagify__dropdown__item",
            dropdownItemActive: "tagify__dropdown__item--active",
            dropdownItemHidden: "tagify__dropdown__item--hidden",
            dropdownInital: "tagify__dropdown--initial",
            tag: "tagify__tag",
            tagText: "tagify__tag-text",
            tagX: "tagify__tag__removeBtn",
            tagLoading: "tagify__tag--loading",
            tagEditing: "tagify__tag--editable",
            tagFlash: "tagify__tag--flash",
            tagHide: "tagify__tag--hide"
        },
        dropdown: {
            classname: "",
            enabled: 2,
            maxItems: 10,
            searchKeys: ["value", "searchBy"],
            fuzzySearch: !0,
            caseSensitive: !1,
            accentedSearch: !0,
            includeSelectedTags: !1,
            escapeHTML: !0,
            highlightFirst: !0,
            closeOnSelect: !0,
            clearOnSelect: !0,
            position: "all",
            appendTarget: null
        },
        hooks: {
            beforeRemoveTag: function() {
                return Promise.resolve()
            },
            beforePaste: function() {
                return Promise.resolve()
            },
            suggestionClick: function() {
                return Promise.resolve()
            },
            beforeKeyDown: function() {
                return Promise.resolve()
            }
        }
    };
    function D(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i,
        t
    }
    function S(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {}
              , n = Object.keys(i);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter((function(t) {
                return Object.getOwnPropertyDescriptor(i, t).enumerable
            }
            )))),
            n.forEach((function(e) {
                D(t, e, i[e])
            }
            ))
        }
        return t
    }
    function I(t, e) {
        return e = null != e ? e : {},
        Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : function(t, e) {
            var i = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function(e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }
                ))),
                i.push.apply(i, n)
            }
            return i
        }(Object(e)).forEach((function(i) {
            Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(e, i))
        }
        )),
        t
    }
    var M = {
        events: {
            binding: function() {
                var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0]
                  , e = this.dropdown.events.callbacks
                  , i = this.listeners.dropdown = this.listeners.dropdown || {
                    position: this.dropdown.position.bind(this, null),
                    onKeyDown: e.onKeyDown.bind(this),
                    onMouseOver: e.onMouseOver.bind(this),
                    onMouseLeave: e.onMouseLeave.bind(this),
                    onClick: e.onClick.bind(this),
                    onScroll: e.onScroll.bind(this)
                }
                  , n = t ? "addEventListener" : "removeEventListener";
                "manual" != this.settings.dropdown.position && (document[n]("scroll", i.position, !0),
                window[n]("resize", i.position),
                window[n]("keydown", i.onKeyDown)),
                this.DOM.dropdown[n]("mouseover", i.onMouseOver),
                this.DOM.dropdown[n]("mouseleave", i.onMouseLeave),
                this.DOM.dropdown[n]("mousedown", i.onClick),
                this.DOM.dropdown.content[n]("scroll", i.onScroll)
            },
            callbacks: {
                onKeyDown: function(t) {
                    var e = this;
                    if (this.state.hasFocus && !this.state.composing) {
                        var i = this.settings
                          , s = this.DOM.dropdown.querySelector(i.classNames.dropdownItemActiveSelector)
                          , a = this.dropdown.getSuggestionDataByNode(s)
                          , o = "mix" == i.mode
                          , r = "select" == i.mode;
                        i.hooks.beforeKeyDown(t, {
                            tagify: this
                        }).then((function(l) {
                            switch (t.key) {
                            case "ArrowDown":
                            case "ArrowUp":
                            case "Down":
                            case "Up":
                                t.preventDefault();
                                var d = e.dropdown.getAllSuggestionsRefs()
                                  , c = "ArrowUp" == t.key || "Up" == t.key;
                                s && (s = e.dropdown.getNextOrPrevOption(s, !c)),
                                s && s.matches(i.classNames.dropdownItemSelector) || (s = d[c ? d.length - 1 : 0]),
                                e.dropdown.highlightOption(s, !0);
                                break;
                            case "Escape":
                            case "Esc":
                                e.dropdown.hide();
                                break;
                            case "ArrowRight":
                                if (e.state.actions.ArrowLeft)
                                    return;
                            case "Tab":
                                var u = !i.autoComplete.rightKey || !i.autoComplete.tabKey;
                                if (!o && !r && s && u && !e.state.editing) {
                                    t.preventDefault();
                                    var g = e.dropdown.getMappedValue(a);
                                    return e.input.autocomplete.set.call(e, g),
                                    !1
                                }
                                return !0;
                            case "Enter":
                                t.preventDefault(),
                                i.hooks.suggestionClick(t, {
                                    tagify: e,
                                    tagData: a,
                                    suggestionElm: s
                                }).then((function() {
                                    if (s)
                                        return e.dropdown.selectOption(s),
                                        s = e.dropdown.getNextOrPrevOption(s, !c),
                                        void e.dropdown.highlightOption(s);
                                    e.dropdown.hide(),
                                    o || e.addTags(e.state.inputText.trim(), !0)
                                }
                                )).catch((function(t) {
                                    return n.warn(t)
                                }
                                ));
                                break;
                            case "Backspace":
                                if (o || e.state.editing.scope)
                                    return;
                                var h = e.input.raw.call(e);
                                "" != h && 8203 != h.charCodeAt(0) || (!0 === i.backspace ? e.removeTags() : "edit" == i.backspace && setTimeout(e.editTag.bind(e), 0))
                            }
                        }
                        ))
                    }
                },
                onMouseOver: function(t) {
                    var e = t.target.closest(this.settings.classNames.dropdownItemSelector);
                    this.dropdown.highlightOption(e)
                },
                onMouseLeave: function(t) {
                    this.dropdown.highlightOption()
                },
                onClick: function(t) {
                    var e = this;
                    if (0 == t.button && t.target != this.DOM.dropdown && t.target != this.DOM.dropdown.content) {
                        var i = t.target.closest(this.settings.classNames.dropdownItemSelector)
                          , s = this.dropdown.getSuggestionDataByNode(i);
                        this.state.actions.selectOption = !0,
                        setTimeout((function() {
                            return e.state.actions.selectOption = !1
                        }
                        ), 50),
                        this.settings.hooks.suggestionClick(t, {
                            tagify: this,
                            tagData: s,
                            suggestionElm: i
                        }).then((function() {
                            i ? e.dropdown.selectOption(i, t) : e.dropdown.hide()
                        }
                        )).catch((function(t) {
                            return n.warn(t)
                        }
                        ))
                    }
                },
                onScroll: function(t) {
                    var e = t.target
                      , i = e.scrollTop / (e.scrollHeight - e.parentNode.clientHeight) * 100;
                    this.trigger("dropdown:scroll", {
                        percentage: Math.round(i)
                    })
                }
            }
        },
        refilter: function(t) {
            t = t || this.state.dropdown.query || "",
            this.suggestedListItems = this.dropdown.filterListItems(t),
            this.dropdown.fill(),
            this.suggestedListItems.length || this.dropdown.hide(),
            this.trigger("dropdown:updated", this.DOM.dropdown)
        },
        getSuggestionDataByNode: function(t) {
            var e = t && t.getAttribute("value");
            return this.suggestedListItems.find((function(t) {
                return t.value == e
            }
            )) || null
        },
        getNextOrPrevOption: function(t) {
            var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
              , i = this.dropdown.getAllSuggestionsRefs()
              , n = i.findIndex((function(e) {
                return e === t
            }
            ));
            return e ? i[n + 1] : i[n - 1]
        },
        highlightOption: function(t, e) {
            var i, n = this.settings.classNames.dropdownItemActive;
            if (this.state.ddItemElm && (this.state.ddItemElm.classList.remove(n),
            this.state.ddItemElm.removeAttribute("aria-selected")),
            !t)
                return this.state.ddItemData = null,
                this.state.ddItemElm = null,
                void this.input.autocomplete.suggest.call(this);
            i = this.dropdown.getSuggestionDataByNode(t),
            this.state.ddItemData = i,
            this.state.ddItemElm = t,
            t.classList.add(n),
            t.setAttribute("aria-selected", !0),
            e && (t.parentNode.scrollTop = t.clientHeight + t.offsetTop - t.parentNode.clientHeight),
            this.settings.autoComplete && (this.input.autocomplete.suggest.call(this, i),
            this.dropdown.position())
        },
        selectOption: function(t, e) {
            var i = this
              , n = this.settings
              , s = n.dropdown
              , a = s.clearOnSelect
              , o = s.closeOnSelect;
            if (!t)
                return this.addTags(this.state.inputText, !0),
                void (o && this.dropdown.hide());
            e = e || {};
            var r = t.getAttribute("value")
              , l = "noMatch" == r
              , d = "mix" == n.mode
              , c = this.suggestedListItems.find((function(t) {
                var e;
                return (null !== (e = t.value) && void 0 !== e ? e : t) == r
            }
            ));
            if (this.trigger("dropdown:select", {
                data: c,
                elm: t,
                event: e
            }),
            r && (c || l)) {
                if (this.state.editing) {
                    var u = this.normalizeTags([c])[0];
                    c = n.transformTag.call(this, u) || u,
                    this.onEditTagDone(null, g({
                        __isValid: !0
                    }, c))
                } else
                    this[d ? "addMixTags" : "addTags"]([c || this.input.raw.call(this)], a);
                (d || this.DOM.input.parentNode) && (setTimeout((function() {
                    i.DOM.input.focus(),
                    i.toggleFocusClass(!0)
                }
                )),
                o && setTimeout(this.dropdown.hide.bind(this)),
                t.addEventListener("transitionend", (function() {
                    i.dropdown.fillHeaderFooter(),
                    setTimeout((function() {
                        t.remove(),
                        i.dropdown.refilter()
                    }
                    ), 100)
                }
                ), {
                    once: !0
                }),
                t.classList.add(this.settings.classNames.dropdownItemHidden))
            } else
                o && setTimeout(this.dropdown.hide.bind(this))
        },
        selectAll: function(t) {
            this.suggestedListItems.length = 0,
            this.dropdown.hide(),
            this.dropdown.filterListItems("");
            var e = this.dropdown.filterListItems("");
            return t || (e = this.state.dropdown.suggestions),
            this.addTags(e, !0),
            this
        },
        filterListItems: function(t, e) {
            var i, n, s, a, o, r, l = function() {
                var t, l, d = void 0, c = void 0;
                t = m[y],
                n = (null != (l = Object) && "undefined" != typeof Symbol && l[Symbol.hasInstance] ? l[Symbol.hasInstance](t) : t instanceof l) ? m[y] : {
                    value: m[y]
                };
                var v, w = !Object.keys(n).some((function(t) {
                    return b.includes(t)
                }
                )) ? ["value"] : b;
                g.fuzzySearch && !e.exact ? (a = w.reduce((function(t, e) {
                    return t + " " + (n[e] || "")
                }
                ), "").toLowerCase().trim(),
                g.accentedSearch && (a = p(a),
                r = p(r)),
                d = 0 == a.indexOf(r),
                c = a === r,
                v = a,
                s = r.toLowerCase().split(" ").every((function(t) {
                    return v.includes(t.toLowerCase())
                }
                ))) : (d = !0,
                s = w.some((function(t) {
                    var i = "" + (n[t] || "");
                    return g.accentedSearch && (i = p(i),
                    r = p(r)),
                    g.caseSensitive || (i = i.toLowerCase()),
                    c = i === r,
                    e.exact ? i === r : 0 == i.indexOf(r)
                }
                ))),
                o = !g.includeSelectedTags && i.isTagDuplicate(u(n) ? n.value : n),
                s && !o && (c && d ? f.push(n) : "startsWith" == g.sortby && d ? h.unshift(n) : h.push(n))
            }, d = this, c = this.settings, g = c.dropdown, h = (e = e || {},
            []), f = [], m = c.whitelist, v = g.maxItems >= 0 ? g.maxItems : 1 / 0, b = g.searchKeys, y = 0;
            if (!(t = "select" == c.mode && this.value.length && this.value[0][c.tagTextProp] == t ? "" : t) || !b.length)
                return h = g.includeSelectedTags ? m : m.filter((function(t) {
                    return !d.isTagDuplicate(u(t) ? t.value : t)
                }
                )),
                this.state.dropdown.suggestions = h,
                h.slice(0, v);
            for (r = g.caseSensitive ? "" + t : ("" + t).toLowerCase(); y < m.length; y++)
                i = this,
                l();
            return this.state.dropdown.suggestions = f.concat(h),
            "function" == typeof g.sortby ? g.sortby(f.concat(h), r) : f.concat(h).slice(0, v)
        },
        getMappedValue: function(t) {
            var e = this.settings.dropdown.mapValueTo;
            return e ? "function" == typeof e ? e(t) : t[e] || t.value : t.value
        },
        createListHTML: function(t) {
            var e = this;
            return g([], t).map((function(t, i) {
                "string" != typeof t && "number" != typeof t || (t = {
                    value: t
                });
                var n = e.dropdown.getMappedValue(t);
                return n = "string" == typeof n && e.settings.dropdown.escapeHTML ? c(n) : n,
                e.settings.templates.dropdownItem.apply(e, [I(S({}, t), {
                    mappedValue: n
                }), e])
            }
            )).join("")
        }
    };
    function E(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++)
            n[i] = t[i];
        return n
    }
    function N(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i,
        t
    }
    function _(t) {
        return function(t) {
            if (Array.isArray(t))
                return E(t)
        }(t) || function(t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"])
                return Array.from(t)
        }(t) || function(t, e) {
            if (!t)
                return;
            if ("string" == typeof t)
                return E(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === i && t.constructor && (i = t.constructor.name);
            if ("Map" === i || "Set" === i)
                return Array.from(i);
            if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
                return E(t, e)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function A() {
        for (var t in this.dropdown = {},
        this._dropdown)
            this.dropdown[t] = "function" == typeof this._dropdown[t] ? this._dropdown[t].bind(this) : this._dropdown[t];
        this.dropdown.refs(),
        this.DOM.dropdown.__tagify = this
    }
    var C, k, L, j = (C = function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {}
              , n = Object.keys(i);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter((function(t) {
                return Object.getOwnPropertyDescriptor(i, t).enumerable
            }
            )))),
            n.forEach((function(e) {
                N(t, e, i[e])
            }
            ))
        }
        return t
    }({}, M),
    k = null != (k = {
        refs: function() {
            this.DOM.dropdown = this.parseTemplate("dropdown", [this.settings]),
            this.DOM.dropdown.content = this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-wrapper']")
        },
        getHeaderRef: function() {
            return this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-header']")
        },
        getFooterRef: function() {
            return this.DOM.dropdown.querySelector("[data-selector='tagify-suggestions-footer']")
        },
        getAllSuggestionsRefs: function() {
            return _(this.DOM.dropdown.content.querySelectorAll(this.settings.classNames.dropdownItemSelector))
        },
        show: function(t) {
            var e, i, n, a = this, o = this.settings, r = "mix" == o.mode && !o.enforceWhitelist, l = !o.whitelist || !o.whitelist.length, d = "manual" == o.dropdown.position;
            if (t = void 0 === t ? this.state.inputText : t,
            !(l && !r && !o.templates.dropdownItemNoMatch || !1 === o.dropdown.enable || this.state.isLoading || this.settings.readonly)) {
                if (clearTimeout(this.dropdownHide__bindEventsTimeout),
                this.suggestedListItems = this.dropdown.filterListItems(t),
                t && !this.suggestedListItems.length && (this.trigger("dropdown:noMatch", t),
                o.templates.dropdownItemNoMatch && (n = o.templates.dropdownItemNoMatch.call(this, {
                    value: t
                }))),
                !n) {
                    if (this.suggestedListItems.length)
                        t && r && !this.state.editing.scope && !s(this.suggestedListItems[0].value, t) && this.suggestedListItems.unshift({
                            value: t
                        });
                    else {
                        if (!t || !r || this.state.editing.scope)
                            return this.input.autocomplete.suggest.call(this),
                            void this.dropdown.hide();
                        this.suggestedListItems = [{
                            value: t
                        }]
                    }
                    i = "" + (u(e = this.suggestedListItems[0]) ? e.value : e),
                    o.autoComplete && i && 0 == i.indexOf(t) && this.input.autocomplete.suggest.call(this, e)
                }
                this.dropdown.fill(n),
                o.dropdown.highlightFirst && this.dropdown.highlightOption(this.DOM.dropdown.content.querySelector(o.classNames.dropdownItemSelector)),
                this.state.dropdown.visible || setTimeout(this.dropdown.events.binding.bind(this)),
                this.state.dropdown.visible = t || !0,
                this.state.dropdown.query = t,
                this.setStateSelection(),
                d || setTimeout((function() {
                    a.dropdown.position(),
                    a.dropdown.render()
                }
                )),
                setTimeout((function() {
                    a.trigger("dropdown:show", a.DOM.dropdown)
                }
                ))
            }
        },
        hide: function(t) {
            var e = this
              , i = this.DOM
              , n = i.scope
              , s = i.dropdown
              , a = "manual" == this.settings.dropdown.position && !t;
            if (s && document.body.contains(s) && !a)
                return window.removeEventListener("resize", this.dropdown.position),
                this.dropdown.events.binding.call(this, !1),
                n.setAttribute("aria-expanded", !1),
                s.parentNode.removeChild(s),
                setTimeout((function() {
                    e.state.dropdown.visible = !1
                }
                ), 100),
                this.state.dropdown.query = this.state.ddItemData = this.state.ddItemElm = this.state.selection = null,
                this.state.tag && this.state.tag.value.length && (this.state.flaggedTags[this.state.tag.baseOffset] = this.state.tag),
                this.trigger("dropdown:hide", s),
                this
        },
        toggle: function(t) {
            this.dropdown[this.state.dropdown.visible && !t ? "hide" : "show"]()
        },
        getAppendTarget: function() {
            var t = this.settings.dropdown;
            return "function" == typeof t.appendTarget ? t.appendTarget() : t.appendTarget
        },
        render: function() {
            var t, e, i, n = this, s = (t = this.DOM.dropdown,
            (i = t.cloneNode(!0)).style.cssText = "position:fixed; top:-9999px; opacity:0",
            document.body.appendChild(i),
            e = i.clientHeight,
            i.parentNode.removeChild(i),
            e), a = this.settings, o = "number" == typeof a.dropdown.enabled && a.dropdown.enabled >= 0, r = this.dropdown.getAppendTarget();
            return o ? (this.DOM.scope.setAttribute("aria-expanded", !0),
            document.body.contains(this.DOM.dropdown) || (this.DOM.dropdown.classList.add(a.classNames.dropdownInital),
            this.dropdown.position(s),
            r.appendChild(this.DOM.dropdown),
            setTimeout((function() {
                return n.DOM.dropdown.classList.remove(a.classNames.dropdownInital)
            }
            ))),
            this) : this
        },
        fill: function(t) {
            t = "string" == typeof t ? t : this.dropdown.createListHTML(t || this.suggestedListItems);
            var e, i = this.settings.templates.dropdownContent.call(this, t);
            this.DOM.dropdown.content.innerHTML = (e = i) ? e.replace(/\>[\r\n ]+\</g, "><").split(/>\s+</).join("><").trim() : ""
        },
        fillHeaderFooter: function() {
            var t = this.dropdown.filterListItems(this.state.dropdown.query)
              , e = this.parseTemplate("dropdownHeader", [t])
              , i = this.parseTemplate("dropdownFooter", [t])
              , n = this.dropdown.getHeaderRef()
              , s = this.dropdown.getFooterRef();
            e && (null == n || n.parentNode.replaceChild(e, n)),
            i && (null == s || s.parentNode.replaceChild(i, s))
        },
        position: function(t) {
            var e = this.settings.dropdown
              , i = this.dropdown.getAppendTarget();
            if ("manual" != e.position && i) {
                var n, s, a, o, r, l, d, c, u, g = this.DOM.dropdown, h = e.RTL, p = i === document.body, f = i === this.DOM.scope, m = p ? window.pageYOffset : i.scrollTop, v = document.fullscreenElement || document.webkitFullscreenElement || document.documentElement, b = v.clientHeight, y = Math.max(v.clientWidth || 0, window.innerWidth || 0) > 480 ? e.position : "all", w = this.DOM["input" == y ? "input" : "scope"];
                if (t = t || g.clientHeight,
                this.state.dropdown.visible) {
                    if ("text" == y ? (a = (n = function() {
                        var t = document.getSelection();
                        if (t.rangeCount) {
                            var e, i, n = t.getRangeAt(0), s = n.startContainer, a = n.startOffset;
                            if (a > 0)
                                return (i = document.createRange()).setStart(s, a - 1),
                                i.setEnd(s, a),
                                {
                                    left: (e = i.getBoundingClientRect()).right,
                                    top: e.top,
                                    bottom: e.bottom
                                };
                            if (s.getBoundingClientRect)
                                return s.getBoundingClientRect()
                        }
                        return {
                            left: -9999,
                            top: -9999
                        }
                    }()).bottom,
                    s = n.top,
                    o = n.left,
                    r = "auto") : (l = function(t) {
                        var e = 0
                          , i = 0;
                        for (t = t.parentNode; t && t != v; )
                            e += t.offsetTop || 0,
                            i += t.offsetLeft || 0,
                            t = t.parentNode;
                        return {
                            top: e,
                            left: i
                        }
                    }(i),
                    n = w.getBoundingClientRect(),
                    s = f ? -1 : n.top - l.top,
                    a = (f ? n.height : n.bottom - l.top) - 1,
                    o = f ? -1 : n.left - l.left,
                    r = n.width + "px"),
                    !p) {
                        var T = function() {
                            for (var t = 0, i = e.appendTarget.parentNode; i; )
                                t += i.scrollTop || 0,
                                i = i.parentNode;
                            return t
                        }();
                        s += T,
                        a += T
                    }
                    var O;
                    s = Math.floor(s),
                    a = Math.ceil(a),
                    c = ((d = null !== (O = e.placeAbove) && void 0 !== O ? O : b - n.bottom < t) ? s : a) + m,
                    u = "left: ".concat(o + (h && n.width || 0) + window.pageXOffset, "px;"),
                    g.style.cssText = "".concat(u, "; top: ").concat(c, "px; min-width: ").concat(r, "; max-width: ").concat(r),
                    g.setAttribute("placement", d ? "top" : "bottom"),
                    g.setAttribute("position", y)
                }
            }
        }
    }) ? k : {},
    Object.getOwnPropertyDescriptors ? Object.defineProperties(C, Object.getOwnPropertyDescriptors(k)) : function(t, e) {
        var i = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t);
            e && (n = n.filter((function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
            }
            ))),
            i.push.apply(i, n)
        }
        return i
    }(Object(k)).forEach((function(t) {
        Object.defineProperty(C, t, Object.getOwnPropertyDescriptor(k, t))
    }
    )),
    C), P = "@yaireo/tagify/", V = {
        empty: "empty",
        exceed: "number of tags exceeded",
        pattern: "pattern mismatch",
        duplicate: "already exists",
        notAllowed: "not allowed"
    }, F = {
        wrapper: function(e, i) {
            return '<tags class="'.concat(i.classNames.namespace, " ").concat(i.mode ? "".concat(i.classNames[i.mode + "Mode"]) : "", " ").concat(e.className, '"\n                    ').concat(i.readonly ? "readonly" : "", "\n                    ").concat(i.disabled ? "disabled" : "", "\n                    ").concat(i.required ? "required" : "", "\n                    ").concat("select" === i.mode ? "spellcheck='false'" : "", '\n                    tabIndex="-1">\n                    ').concat(this.settings.templates.input.call(this), "\n                ").concat(t, "\n        </tags>")
        },
        input: function() {
            var e = this.settings
              , i = e.placeholder || t;
            return "<span ".concat(!e.readonly && e.userInput ? "contenteditable" : "", ' tabIndex="0" data-placeholder="').concat(i, '" aria-placeholder="').concat(e.placeholder || "", '"\n                    class="').concat(e.classNames.input, '"\n                    role="textbox"\n                    aria-autocomplete="both"\n                    aria-multiline="').concat("mix" == e.mode, '"></span>')
        },
        tag: function(t, e) {
            var i = e.settings;
            return '<tag title="'.concat(t.title || t.value, "\"\n                    contenteditable='false'\n                    spellcheck='false'\n                    tabIndex=\"").concat(i.a11y.focusableTags ? 0 : -1, '"\n                    class="').concat(i.classNames.tag, " ").concat(t.class || "", '"\n                    ').concat(this.getAttributes(t), ">\n            <x title='' tabIndex=\"").concat(i.a11y.focusableTags ? 0 : -1, '" class="').concat(i.classNames.tagX, "\" role='button' aria-label='remove tag'></x>\n            <div>\n                <span ").concat("select" === i.mode && i.userInput ? "contenteditable='true'" : "", ' class="').concat(i.classNames.tagText, '">').concat(t[i.tagTextProp] || t.value, "</span>\n            </div>\n        </tag>")
        },
        dropdown: function(t) {
            var e = t.dropdown
              , i = "manual" == e.position;
            return '<div class="'.concat(i ? "" : t.classNames.dropdown, " ").concat(e.classname, '" role="listbox" aria-labelledby="dropdown" dir="').concat(e.RTL ? "rtl" : "", "\">\n                    <div data-selector='tagify-suggestions-wrapper' class=\"").concat(t.classNames.dropdownWrapper, '"></div>\n                </div>')
        },
        dropdownContent: function(t) {
            var e = this.settings.templates
              , i = this.state.dropdown.suggestions;
            return "\n            ".concat(e.dropdownHeader.call(this, i), "\n            ").concat(t, "\n            ").concat(e.dropdownFooter.call(this, i), "\n        ")
        },
        dropdownItem: function(t) {
            return "<div ".concat(this.getAttributes(t), "\n                    class='").concat(this.settings.classNames.dropdownItem, " ").concat(t.class || "", '\'\n                    tabindex="0"\n                    role="option">').concat(t.mappedValue || t.value, "</div>")
        },
        dropdownHeader: function(t) {
            return "<header data-selector='tagify-suggestions-header' class=\"".concat(this.settings.classNames.dropdownHeader, '"></header>')
        },
        dropdownFooter: function(t) {
            var e = t.length - this.settings.dropdown.maxItems;
            return e > 0 ? "<footer data-selector='tagify-suggestions-footer' class=\"".concat(this.settings.classNames.dropdownFooter, '">\n                ').concat(e, " more items. Refine your search.\n            </footer>") : ""
        },
        dropdownItemNoMatch: null
    };
    function R(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++)
            n[i] = t[i];
        return n
    }
    function H(t, e) {
        return null != e && "undefined" != typeof Symbol && e[Symbol.hasInstance] ? !!e[Symbol.hasInstance](t) : t instanceof e
    }
    function B(t, e) {
        return function(t) {
            if (Array.isArray(t))
                return t
        }(t) || function(t, e) {
            var i = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
            if (null != i) {
                var n, s, a = [], o = !0, r = !1;
                try {
                    for (i = i.call(t); !(o = (n = i.next()).done) && (a.push(n.value),
                    !e || a.length !== e); o = !0)
                        ;
                } catch (t) {
                    r = !0,
                    s = t
                } finally {
                    try {
                        o || null == i.return || i.return()
                    } finally {
                        if (r)
                            throw s
                    }
                }
                return a
            }
        }(t, e) || function(t, e) {
            if (!t)
                return;
            if ("string" == typeof t)
                return R(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === i && t.constructor && (i = t.constructor.name);
            if ("Map" === i || "Set" === i)
                return Array.from(i);
            if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
                return R(t, e)
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function W(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++)
            n[i] = t[i];
        return n
    }
    function U(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i,
        t
    }
    function q(t, e) {
        return null != e && "undefined" != typeof Symbol && e[Symbol.hasInstance] ? !!e[Symbol.hasInstance](t) : t instanceof e
    }
    function K(t, e) {
        return e = null != e ? e : {},
        Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : function(t, e) {
            var i = Object.keys(t);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(t);
                e && (n = n.filter((function(e) {
                    return Object.getOwnPropertyDescriptor(t, e).enumerable
                }
                ))),
                i.push.apply(i, n)
            }
            return i
        }(Object(e)).forEach((function(i) {
            Object.defineProperty(t, i, Object.getOwnPropertyDescriptor(e, i))
        }
        )),
        t
    }
    function z(t) {
        return function(t) {
            if (Array.isArray(t))
                return W(t)
        }(t) || function(t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"])
                return Array.from(t)
        }(t) || function(t, e) {
            if (!t)
                return;
            if ("string" == typeof t)
                return W(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === i && t.constructor && (i = t.constructor.name);
            if ("Map" === i || "Set" === i)
                return Array.from(i);
            if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
                return W(t, e)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    var X = {
        customBinding: function() {
            var t = this;
            this.customEventsList.forEach((function(e) {
                t.on(e, t.settings.callbacks[e])
            }
            ))
        },
        binding: function() {
            var t, e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], i = this.settings, n = this.events.callbacks, s = e ? "addEventListener" : "removeEventListener";
            if (!this.state.mainEvents || !e) {
                for (var a in this.state.mainEvents = e,
                e && !this.listeners.main && (this.events.bindGlobal.call(this),
                this.settings.isJQueryPlugin && jQuery(this.DOM.originalInput).on("tagify.removeAllTags", this.removeAllTags.bind(this))),
                t = this.listeners.main = this.listeners.main || {
                    keydown: ["input", n.onKeydown.bind(this)],
                    click: ["scope", n.onClickScope.bind(this)],
                    dblclick: "select" != i.mode && ["scope", n.onDoubleClickScope.bind(this)],
                    paste: ["input", n.onPaste.bind(this)],
                    drop: ["input", n.onDrop.bind(this)],
                    compositionstart: ["input", n.onCompositionStart.bind(this)],
                    compositionend: ["input", n.onCompositionEnd.bind(this)]
                })
                    t[a] && this.DOM[t[a][0]][s](a, t[a][1]);
                var o = this.listeners.main.inputMutationObserver || new MutationObserver(n.onInputDOMChange.bind(this));
                o.disconnect(),
                "mix" == i.mode && o.observe(this.DOM.input, {
                    childList: !0
                }),
                this.events.bindOriginaInputListener.call(this)
            }
        },
        bindOriginaInputListener: function(t) {
            var e = (t || 0) + 500;
            this.listeners.main && (clearInterval(this.listeners.main.originalInputValueObserverInterval),
            this.listeners.main.originalInputValueObserverInterval = setInterval(this.events.callbacks.observeOriginalInputValue.bind(this), e))
        },
        bindGlobal: function(t) {
            var e, i = this.events.callbacks, n = t ? "removeEventListener" : "addEventListener";
            if (this.listeners && (t || !this.listeners.global)) {
                this.listeners.global = this.listeners.global || [{
                    type: this.isIE ? "keydown" : "input",
                    target: this.DOM.input,
                    cb: i[this.isIE ? "onInputIE" : "onInput"].bind(this)
                }, {
                    type: "keydown",
                    target: window,
                    cb: i.onWindowKeyDown.bind(this)
                }, {
                    type: "focusin",
                    target: this.DOM.scope,
                    cb: i.onFocusBlur.bind(this)
                }, {
                    type: "focusout",
                    target: this.DOM.scope,
                    cb: i.onFocusBlur.bind(this)
                }, {
                    type: "click",
                    target: document,
                    cb: i.onClickAnywhere.bind(this),
                    useCapture: !0
                }];
                var s = !0
                  , a = !1
                  , o = void 0;
                try {
                    for (var r, l = this.listeners.global[Symbol.iterator](); !(s = (r = l.next()).done); s = !0)
                        (e = r.value).target[n](e.type, e.cb, !!e.useCapture)
                } catch (t) {
                    a = !0,
                    o = t
                } finally {
                    try {
                        s || null == l.return || l.return()
                    } finally {
                        if (a)
                            throw o
                    }
                }
            }
        },
        unbindGlobal: function() {
            this.events.bindGlobal.call(this, !0)
        },
        callbacks: {
            onFocusBlur: function(t) {
                var e, i, n, s = b.call(this, t.target), a = v.call(this, t.target), o = "focusin" == t.type, r = "focusout" == t.type;
                null === (e = t.target) || void 0 === e || e.closest(this.settings.classNames.tagTextSelector),
                s && o && !a && this.toggleFocusClass(this.state.hasFocus = +new Date);
                var l = this.settings
                  , d = t.target ? this.trim(this.DOM.input.textContent) : ""
                  , c = null === (n = this.value) || void 0 === n || null === (i = n[0]) || void 0 === i ? void 0 : i[l.tagTextProp]
                  , u = l.dropdown.enabled >= 0
                  , g = {
                    relatedTarget: t.relatedTarget
                }
                  , h = this.state.actions.selectOption && (u || !l.dropdown.closeOnSelect)
                  , p = this.state.actions.addNew && u;
                if (r) {
                    if (t.relatedTarget === this.DOM.scope)
                        return this.dropdown.hide(),
                        void this.DOM.input.focus();
                    this.postUpdate()
                }
                if (!h && !p)
                    if (o || s ? (this.state.hasFocus = +new Date,
                    this.toggleFocusClass(this.state.hasFocus)) : this.state.hasFocus = !1,
                    "mix" != l.mode) {
                        if (o) {
                            if (!l.focusable)
                                return;
                            var f = 0 === l.dropdown.enabled && !this.state.dropdown.visible;
                            return this.toggleFocusClass(!0),
                            this.trigger("focus", g),
                            void (!f || a && "select" !== l.mode || this.dropdown.show(this.value.length ? "" : void 0))
                        }
                        if (r) {
                            if (this.trigger("blur", g),
                            this.loading(!1),
                            "select" == l.mode) {
                                if (this.value.length) {
                                    var m = this.getTagElms()[0];
                                    d = this.trim(m.textContent)
                                }
                                c === d && (d = "")
                            }
                            d && !this.state.actions.selectOption && l.addTagOnBlur && l.addTagOn.includes("blur") && this.addTags(d, !0)
                        }
                        s || (this.DOM.input.removeAttribute("style"),
                        this.dropdown.hide())
                    } else
                        o ? this.trigger("focus", g) : r && (this.trigger("blur", g),
                        this.loading(!1),
                        this.dropdown.hide(),
                        this.state.dropdown.visible = void 0,
                        this.setStateSelection())
            },
            onCompositionStart: function(t) {
                this.state.composing = !0
            },
            onCompositionEnd: function(t) {
                this.state.composing = !1
            },
            onWindowKeyDown: function(t) {
                var e, i = this.settings, n = document.activeElement, s = b.call(this, n) && this.DOM.scope.contains(document.activeElement), a = s && n.hasAttribute("readonly");
                if (this.state.hasFocus || s && !a) {
                    e = n.nextElementSibling;
                    var o = t.target.classList.contains(i.classNames.tagX);
                    switch (t.key) {
                    case "Backspace":
                        i.readonly || this.state.editing || (this.removeTags(n),
                        (e || this.DOM.input).focus());
                        break;
                    case "Enter":
                        if (o)
                            return void this.removeTags(t.target.parentNode);
                        i.a11y.focusableTags && v.call(this, n) && setTimeout(this.editTag.bind(this), 0, n);
                        break;
                    case "ArrowDown":
                        this.state.dropdown.visible || "mix" == i.mode || this.dropdown.show()
                    }
                }
            },
            onKeydown: function(t) {
                var e = this
                  , i = this.settings;
                if (!this.state.composing && i.userInput) {
                    "select" == i.mode && i.enforceWhitelist && this.value.length && "Tab" != t.key && t.preventDefault();
                    var n = this.trim(t.target.textContent);
                    this.trigger("keydown", {
                        event: t
                    }),
                    i.hooks.beforeKeyDown(t, {
                        tagify: this
                    }).then((function(s) {
                        if ("mix" == i.mode) {
                            switch (t.key) {
                            case "Left":
                            case "ArrowLeft":
                                e.state.actions.ArrowLeft = !0;
                                break;
                            case "Delete":
                            case "Backspace":
                                if (e.state.editing)
                                    return;
                                var a = document.getSelection()
                                  , o = "Delete" == t.key && a.anchorOffset == (a.anchorNode.length || 0)
                                  , l = a.anchorNode.previousSibling
                                  , c = 1 == a.anchorNode.nodeType || !a.anchorOffset && l && 1 == l.nodeType && a.anchorNode.previousSibling;
                                r(e.DOM.input.innerHTML);
                                var u, g, h, p = e.getTagElms(), m = 1 === a.anchorNode.length && a.anchorNode.nodeValue == String.fromCharCode(8203);
                                if ("edit" == i.backspace && c)
                                    return u = 1 == a.anchorNode.nodeType ? null : a.anchorNode.previousElementSibling,
                                    setTimeout(e.editTag.bind(e), 0, u),
                                    void t.preventDefault();
                                if (f() && q(c, Element))
                                    return h = d(c),
                                    c.hasAttribute("readonly") || c.remove(),
                                    e.DOM.input.focus(),
                                    void setTimeout((function() {
                                        T(h),
                                        e.DOM.input.click()
                                    }
                                    ));
                                if ("BR" == a.anchorNode.nodeName)
                                    return;
                                if ((o || c) && 1 == a.anchorNode.nodeType ? g = 0 == a.anchorOffset ? o ? p[0] : null : p[Math.min(p.length, a.anchorOffset) - 1] : o ? g = a.anchorNode.nextElementSibling : q(c, Element) && (g = c),
                                3 == a.anchorNode.nodeType && !a.anchorNode.nodeValue && a.anchorNode.previousElementSibling && t.preventDefault(),
                                (c || o) && !i.backspace)
                                    return void t.preventDefault();
                                if ("Range" != a.type && !a.anchorOffset && a.anchorNode == e.DOM.input && "Delete" != t.key)
                                    return void t.preventDefault();
                                if ("Range" != a.type && g && g.hasAttribute("readonly"))
                                    return void T(d(g));
                                "Delete" == t.key && m && w(a.anchorNode.nextSibling) && e.removeTags(a.anchorNode.nextSibling),
                                clearTimeout(L),
                                L = setTimeout((function() {
                                    var t = document.getSelection();
                                    r(e.DOM.input.innerHTML),
                                    !o && t.anchorNode.previousSibling,
                                    e.value = [].map.call(p, (function(t, i) {
                                        var n = w(t);
                                        if (t.parentNode || n.readonly)
                                            return n;
                                        e.trigger("remove", {
                                            tag: t,
                                            index: i,
                                            data: n
                                        })
                                    }
                                    )).filter((function(t) {
                                        return t
                                    }
                                    ))
                                }
                                ), 20)
                            }
                            return !0
                        }
                        var v = "manual" == i.dropdown.position;
                        switch (t.key) {
                        case "Backspace":
                            "select" == i.mode && i.enforceWhitelist && e.value.length ? e.removeTags() : e.state.dropdown.visible && "manual" != i.dropdown.position || "" != t.target.textContent && 8203 != n.charCodeAt(0) || (!0 === i.backspace ? e.removeTags() : "edit" == i.backspace && setTimeout(e.editTag.bind(e), 0));
                            break;
                        case "Esc":
                        case "Escape":
                            if (e.state.dropdown.visible)
                                return;
                            t.target.blur();
                            break;
                        case "Down":
                        case "ArrowDown":
                            e.state.dropdown.visible || e.dropdown.show();
                            break;
                        case "ArrowRight":
                            var b = e.state.inputSuggestion || e.state.ddItemData;
                            if (b && i.autoComplete.rightKey)
                                return void e.addTags([b], !0);
                            break;
                        case "Tab":
                            var y = "select" == i.mode;
                            if (!n || y)
                                return !0;
                            t.preventDefault();
                        case "Enter":
                            if (e.state.dropdown.visible && !v)
                                return;
                            t.preventDefault(),
                            setTimeout((function() {
                                e.state.dropdown.visible && !v || e.state.actions.selectOption || !i.addTagOn.includes(t.key.toLowerCase()) || e.addTags(n, !0)
                            }
                            ))
                        }
                    }
                    )).catch((function(t) {
                        return t
                    }
                    ))
                }
            },
            onInput: function(t) {
                this.postUpdate();
                var e = this.settings;
                if ("mix" == e.mode)
                    return this.events.callbacks.onMixTagsInput.call(this, t);
                var i = this.input.normalize.call(this, void 0, {
                    trim: !1
                })
                  , n = i.length >= e.dropdown.enabled
                  , s = {
                    value: i,
                    inputElm: this.DOM.input
                }
                  , a = this.validateTag({
                    value: i
                });
                "select" == e.mode && this.toggleScopeValidation(a),
                s.isValid = a,
                this.state.inputText != i && (this.input.set.call(this, i, !1),
                -1 != i.search(e.delimiters) ? this.addTags(i) && this.input.set.call(this) : e.dropdown.enabled >= 0 && this.dropdown[n ? "show" : "hide"](i),
                this.trigger("input", s))
            },
            onMixTagsInput: function(t) {
                var e, i, n, s, a, o, r, l, d = this, c = this.settings, u = this.value.length, h = this.getTagElms(), p = document.createDocumentFragment(), m = window.getSelection().getRangeAt(0), v = [].map.call(h, (function(t) {
                    return w(t).value
                }
                ));
                if ("deleteContentBackward" == t.inputType && f() && this.events.callbacks.onKeydown.call(this, {
                    target: t.target,
                    key: "Backspace"
                }),
                O(this.getTagElms()),
                this.value.slice().forEach((function(t) {
                    t.readonly && !v.includes(t.value) && p.appendChild(d.createTagElem(t))
                }
                )),
                p.childNodes.length && (m.insertNode(p),
                this.setRangeAtStartEnd(!1, p.lastChild)),
                h.length != u)
                    return this.value = [].map.call(this.getTagElms(), (function(t) {
                        return w(t)
                    }
                    )),
                    void this.update({
                        withoutChangeEvent: !0
                    });
                if (this.hasMaxTags())
                    return !0;
                if (window.getSelection && (o = window.getSelection()).rangeCount > 0 && 3 == o.anchorNode.nodeType) {
                    if ((m = o.getRangeAt(0).cloneRange()).collapse(!0),
                    m.setStart(o.focusNode, 0),
                    n = (e = m.toString().slice(0, m.endOffset)).split(c.pattern).length - 1,
                    (i = e.match(c.pattern)) && (s = e.slice(e.lastIndexOf(i[i.length - 1]))),
                    s) {
                        if (this.state.actions.ArrowLeft = !1,
                        this.state.tag = {
                            prefix: s.match(c.pattern)[0],
                            value: s.replace(c.pattern, "")
                        },
                        this.state.tag.baseOffset = o.baseOffset - this.state.tag.value.length,
                        l = this.state.tag.value.match(c.delimiters))
                            return this.state.tag.value = this.state.tag.value.replace(c.delimiters, ""),
                            this.state.tag.delimiters = l[0],
                            this.addTags(this.state.tag.value, c.dropdown.clearOnSelect),
                            void this.dropdown.hide();
                        a = this.state.tag.value.length >= c.dropdown.enabled;
                        try {
                            r = (r = this.state.flaggedTags[this.state.tag.baseOffset]).prefix == this.state.tag.prefix && r.value[0] == this.state.tag.value[0],
                            this.state.flaggedTags[this.state.tag.baseOffset] && !this.state.tag.value && delete this.state.flaggedTags[this.state.tag.baseOffset]
                        } catch (t) {}
                        (r || n < this.state.mixMode.matchedPatternCount) && (a = !1)
                    } else
                        this.state.flaggedTags = {};
                    this.state.mixMode.matchedPatternCount = n
                }
                setTimeout((function() {
                    d.update({
                        withoutChangeEvent: !0
                    }),
                    d.trigger("input", g({}, d.state.tag, {
                        textContent: d.DOM.input.textContent
                    })),
                    d.state.tag && d.dropdown[a ? "show" : "hide"](d.state.tag.value)
                }
                ), 10)
            },
            onInputIE: function(t) {
                var e = this;
                setTimeout((function() {
                    e.events.callbacks.onInput.call(e, t)
                }
                ))
            },
            observeOriginalInputValue: function() {
                this.DOM.originalInput.parentNode || this.destroy(),
                this.DOM.originalInput.value != this.DOM.originalInput.tagifyValue && this.loadOriginalValues()
            },
            onClickAnywhere: function(t) {
                t.target == this.DOM.scope || this.DOM.scope.contains(t.target) || (this.toggleFocusClass(!1),
                this.state.hasFocus = !1,
                t.target.closest(".tagify__dropdown") && t.target.closest(".tagify__dropdown").__tagify != this && this.dropdown.hide())
            },
            onClickScope: function(t) {
                var e = this.settings
                  , i = t.target.closest("." + e.classNames.tag)
                  , n = t.target === this.DOM.scope
                  , s = +new Date - this.state.hasFocus;
                if (n && "select" != e.mode)
                    this.DOM.input.focus();
                else {
                    if (!t.target.classList.contains(e.classNames.tagX))
                        return i && !this.state.editing ? (this.trigger("click", {
                            tag: i,
                            index: this.getNodeIndex(i),
                            data: w(i),
                            event: t
                        }),
                        void (1 !== e.editTags && 1 !== e.editTags.clicks && "select" != e.mode || this.events.callbacks.onDoubleClickScope.call(this, t))) : void (t.target == this.DOM.input && ("mix" == e.mode && this.fixFirefoxLastTagNoCaret(),
                        s > 500 || !e.focusable) ? this.state.dropdown.visible ? this.dropdown.hide() : 0 === e.dropdown.enabled && "mix" != e.mode && this.dropdown.show(this.value.length ? "" : void 0) : "select" != e.mode || 0 !== e.dropdown.enabled || this.state.dropdown.visible || (this.events.callbacks.onDoubleClickScope.call(this, K(function(t) {
                            for (var e = 1; e < arguments.length; e++) {
                                var i = null != arguments[e] ? arguments[e] : {}
                                  , n = Object.keys(i);
                                "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter((function(t) {
                                    return Object.getOwnPropertyDescriptor(i, t).enumerable
                                }
                                )))),
                                n.forEach((function(e) {
                                    U(t, e, i[e])
                                }
                                ))
                            }
                            return t
                        }({}, t), {
                            target: this.getTagElms()[0]
                        })),
                        !e.userInput && this.dropdown.show()));
                    this.removeTags(t.target.parentNode)
                }
            },
            onPaste: function(t) {
                var e = this;
                t.preventDefault();
                var i, n, s, a = this.settings;
                if ("select" == a.mode && a.enforceWhitelist || !a.userInput)
                    return !1;
                a.readonly || (n = t.clipboardData || window.clipboardData,
                s = n.getData("Text"),
                a.hooks.beforePaste(t, {
                    tagify: this,
                    pastedText: s,
                    clipboardData: n
                }).then((function(a) {
                    void 0 === a && (a = s),
                    a && (e.injectAtCaret(a, window.getSelection().getRangeAt(0)),
                    "mix" == e.settings.mode ? e.events.callbacks.onMixTagsInput.call(e, t) : e.settings.pasteAsTags ? i = e.addTags(e.state.inputText + a, !0) : (e.state.inputText = a,
                    e.dropdown.show(a))),
                    e.trigger("paste", {
                        event: t,
                        pastedText: s,
                        clipboardData: n,
                        tagsElems: i
                    })
                }
                )).catch((function(t) {
                    return t
                }
                )))
            },
            onDrop: function(t) {
                t.preventDefault()
            },
            onEditTagInput: function(t, e) {
                var i, n = t.closest("." + this.settings.classNames.tag), s = this.getNodeIndex(n), a = w(n), o = this.input.normalize.call(this, t), r = (U(i = {}, this.settings.tagTextProp, o),
                U(i, "__tagId", a.__tagId),
                i), l = this.validateTag(r);
                this.editTagChangeDetected(g(a, r)) || !0 !== t.originalIsValid || (l = !0),
                n.classList.toggle(this.settings.classNames.tagInvalid, !0 !== l),
                a.__isValid = l,
                n.title = !0 === l ? a.title || a.value : l,
                o.length >= this.settings.dropdown.enabled && (this.state.editing && (this.state.editing.value = o),
                this.dropdown.show(o)),
                this.trigger("edit:input", {
                    tag: n,
                    index: s,
                    data: g({}, this.value[s], {
                        newValue: o
                    }),
                    event: e
                })
            },
            onEditTagPaste: function(t, e) {
                var i = (e.clipboardData || window.clipboardData).getData("Text");
                e.preventDefault();
                var n = y(i);
                this.setRangeAtStartEnd(!1, n)
            },
            onEditTagClick: function(t, e) {
                this.events.callbacks.onClickScope.call(this, e)
            },
            onEditTagFocus: function(t) {
                this.state.editing = {
                    scope: t,
                    input: t.querySelector("[contenteditable]")
                }
            },
            onEditTagBlur: function(t, e) {
                var i = v.call(this, e.relatedTarget);
                if ("select" == this.settings.mode && i && e.relatedTarget.contains(e.target))
                    this.dropdown.hide();
                else if (this.state.editing && (this.state.hasFocus || this.toggleFocusClass(),
                this.DOM.scope.contains(t))) {
                    var n, s, a, o = this.settings, r = t.closest("." + o.classNames.tag), l = w(r), d = this.input.normalize.call(this, t), c = (U(n = {}, o.tagTextProp, d),
                    U(n, "__tagId", l.__tagId),
                    n), u = l.__originalData, h = this.editTagChangeDetected(g(l, c)), p = this.validateTag(c);
                    if (d)
                        if (h) {
                            var f;
                            if (s = this.hasMaxTags(),
                            a = g({}, u, (U(f = {}, o.tagTextProp, this.trim(d)),
                            U(f, "__isValid", p),
                            f)),
                            o.transformTag.call(this, a, u),
                            !0 !== (p = (!s || !0 === u.__isValid) && this.validateTag(a))) {
                                if (this.trigger("invalid", {
                                    data: a,
                                    tag: r,
                                    message: p
                                }),
                                o.editTags.keepInvalid)
                                    return;
                                o.keepInvalidTags ? a.__isValid = p : a = u
                            } else
                                o.keepInvalidTags && (delete a.title,
                                delete a["aria-invalid"],
                                delete a.class);
                            this.onEditTagDone(r, a)
                        } else
                            this.onEditTagDone(r, u);
                    else
                        this.onEditTagDone(r)
                }
            },
            onEditTagkeydown: function(t, e) {
                if (!this.state.composing)
                    switch (this.trigger("edit:keydown", {
                        event: t
                    }),
                    t.key) {
                    case "Esc":
                    case "Escape":
                        this.state.editing = !1,
                        !!e.__tagifyTagData.__originalData.value ? e.parentNode.replaceChild(e.__tagifyTagData.__originalHTML, e) : e.remove();
                        break;
                    case "Enter":
                    case "Tab":
                        t.preventDefault();
                        setTimeout((function() {
                            return t.target.blur()
                        }
                        ), 0)
                    }
            },
            onDoubleClickScope: function(t) {
                var e, i, n = t.target.closest("." + this.settings.classNames.tag), s = w(n), a = this.settings;
                n && !1 !== s.editable && (e = n.classList.contains(this.settings.classNames.tagEditing),
                i = n.hasAttribute("readonly"),
                a.readonly || e || i || !this.settings.editTags || !a.userInput || (this.events.callbacks.onEditTagFocus.call(this, n),
                this.editTag(n)),
                this.toggleFocusClass(!0),
                "select" != a.mode && this.trigger("dblclick", {
                    tag: n,
                    index: this.getNodeIndex(n),
                    data: w(n)
                }))
            },
            onInputDOMChange: function(t) {
                var e = this;
                t.forEach((function(t) {
                    t.addedNodes.forEach((function(t) {
                        if ("<div><br></div>" == t.outerHTML)
                            t.replaceWith(document.createElement("br"));
                        else if (1 == t.nodeType && t.querySelector(e.settings.classNames.tagSelector)) {
                            var i, n = document.createTextNode("");
                            3 == t.childNodes[0].nodeType && "BR" != t.previousSibling.nodeName && (n = document.createTextNode("\n")),
                            (i = t).replaceWith.apply(i, z([n].concat(z(z(t.childNodes).slice(0, -1))))),
                            T(n)
                        } else if (v.call(e, t)) {
                            var s;
                            if (3 != (null === (s = t.previousSibling) || void 0 === s ? void 0 : s.nodeType) || t.previousSibling.textContent || t.previousSibling.remove(),
                            t.previousSibling && "BR" == t.previousSibling.nodeName) {
                                t.previousSibling.replaceWith("\n​");
                                for (var a = t.nextSibling, o = ""; a; )
                                    o += a.textContent,
                                    a = a.nextSibling;
                                o.trim() && T(t.previousSibling)
                            } else
                                t.previousSibling && !w(t.previousSibling) || t.before("​")
                        }
                    }
                    )),
                    t.removedNodes.forEach((function(t) {
                        t && "BR" == t.nodeName && v.call(e, i) && (e.removeTags(i),
                        e.fixFirefoxLastTagNoCaret())
                    }
                    ))
                }
                ));
                var i = this.DOM.input.lastChild;
                i && "" == i.nodeValue && i.remove(),
                i && "BR" == i.nodeName || this.DOM.input.appendChild(document.createElement("br"))
            }
        }
    };
    function J(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var i = 0, n = new Array(e); i < e; i++)
            n[i] = t[i];
        return n
    }
    function G(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i,
        t
    }
    function $(t, e) {
        return null != e && "undefined" != typeof Symbol && e[Symbol.hasInstance] ? !!e[Symbol.hasInstance](t) : t instanceof e
    }
    function Q(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {}
              , n = Object.keys(i);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter((function(t) {
                return Object.getOwnPropertyDescriptor(i, t).enumerable
            }
            )))),
            n.forEach((function(e) {
                G(t, e, i[e])
            }
            ))
        }
        return t
    }
    function Y(t) {
        return function(t) {
            if (Array.isArray(t))
                return J(t)
        }(t) || function(t) {
            if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"])
                return Array.from(t)
        }(t) || function(t, e) {
            if (!t)
                return;
            if ("string" == typeof t)
                return J(t, e);
            var i = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === i && t.constructor && (i = t.constructor.name);
            if ("Map" === i || "Set" === i)
                return Array.from(i);
            if ("Arguments" === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))
                return J(t, e)
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }
    function Z(t, e) {
        if (!t) {
            // n.warn("input element not found", t);
            var i = new Proxy(this,{
                get: function() {
                    return function() {
                        return i
                    }
                }
            });
            return i
        }
        if (t.__tagify)
            return n.warn("input element is already Tagified - Same instance is returned.", t),
            t.__tagify;
        var s;
        g(this, function(t) {
            var e = document.createTextNode("")
              , i = {};
            function s(t, i, n) {
                n && i.split(/\s+/g).forEach((function(i) {
                    return e[t + "EventListener"].call(e, i, n)
                }
                ))
            }
            return {
                removeAllCustomListeners: function() {
                    Object.entries(i).forEach((function(t) {
                        var e = B(t, 2)
                          , i = e[0];
                        e[1].forEach((function(t) {
                            return s("remove", i, t)
                        }
                        ))
                    }
                    )),
                    i = {}
                },
                off: function(t, e) {
                    return t && (e ? s("remove", t, e) : t.split(/\s+/g).forEach((function(t) {
                        var e;
                        null === (e = i[t]) || void 0 === e || e.forEach((function(e) {
                            return s("remove", t, e)
                        }
                        )),
                        delete i[t]
                    }
                    ))),
                    this
                },
                on: function(t, e) {
                    return e && "function" == typeof e && (t.split(/\s+/g).forEach((function(t) {
                        Array.isArray(i[t]) ? i[t].push(e) : i[t] = [e]
                    }
                    )),
                    s("add", t, e)),
                    this
                },
                trigger: function(i, s, a) {
                    var o;
                    if (a = a || {
                        cloneData: !0
                    },
                    i)
                        if (t.settings.isJQueryPlugin)
                            "remove" == i && (i = "removeTag"),
                            jQuery(t.DOM.originalInput).triggerHandler(i, [s]);
                        else {
                            try {
                                var r = "object" == typeof s ? s : {
                                    value: s
                                };
                                if ((r = a.cloneData ? g({}, r) : r).tagify = this,
                                s.event && (r.event = this.cloneEvent(s.event)),
                                H(s, Object))
                                    for (var l in s)
                                        H(s[l], HTMLElement) && (r[l] = s[l]);
                                o = new CustomEvent(i,{
                                    detail: r
                                })
                            } catch (t) {
                                n.warn(t)
                            }
                            e.dispatchEvent(o)
                        }
                }
            }
        }(this)),
        this.isFirefox = /firefox|fxios/i.test(navigator.userAgent) && !/seamonkey/i.test(navigator.userAgent),
        this.isIE = window.document.documentMode,
        e = e || {},
        this.getPersistedData = (s = e.id,
        function(t) {
            var e, i = "/" + t;
            if (1 == localStorage.getItem(P + s + "/v", 1))
                try {
                    e = JSON.parse(localStorage[P + s + i])
                } catch (t) {}
            return e
        }
        ),
        this.setPersistedData = function(t) {
            return t ? (localStorage.setItem(P + t + "/v", 1),
            function(e, i) {
                var n = "/" + i
                  , s = JSON.stringify(e);
                e && i && (localStorage.setItem(P + t + n, s),
                dispatchEvent(new Event("storage")))
            }
            ) : function() {}
        }(e.id),
        this.clearPersistedData = function(t) {
            return function(e) {
                var i = P + "/" + t + "/";
                if (e)
                    localStorage.removeItem(i + e);
                else
                    for (var n in localStorage)
                        n.includes(i) && localStorage.removeItem(n)
            }
        }(e.id),
        this.applySettings(t, e),
        this.state = {
            inputText: "",
            editing: !1,
            composing: !1,
            actions: {},
            mixMode: {},
            dropdown: {},
            flaggedTags: {}
        },
        this.value = [],
        this.listeners = {},
        this.DOM = {},
        this.build(t),
        A.call(this),
        this.getCSSVars(),
        this.loadOriginalValues(),
        this.events.customBinding.call(this),
        this.events.binding.call(this),
        t.autofocus && this.DOM.input.focus(),
        t.__tagify = this
    }
    return Z.prototype = {
        _dropdown: j,
        placeCaretAfterNode: T,
        getSetTagData: w,
        helpers: {
            sameStr: s,
            removeCollectionProp: a,
            omit: o,
            isObject: u,
            parseHTML: l,
            escapeHTML: c,
            extend: g,
            concatWithoutDups: h,
            getUID: m,
            isNodeTag: v
        },
        customEventsList: ["change", "add", "remove", "invalid", "input", "paste", "click", "keydown", "focus", "blur", "edit:input", "edit:beforeUpdate", "edit:updated", "edit:start", "edit:keydown", "dropdown:show", "dropdown:hide", "dropdown:select", "dropdown:updated", "dropdown:noMatch", "dropdown:scroll"],
        dataProps: ["__isValid", "__removed", "__originalData", "__originalHTML", "__tagId"],
        trim: function(t) {
            return this.settings.trim && t && "string" == typeof t ? t.trim() : t
        },
        parseHTML: l,
        templates: F,
        parseTemplate: function(t, e) {
            return l((t = this.settings.templates[t] || t).apply(this, e))
        },
        set whitelist(t) {
            var e = t && Array.isArray(t);
            this.settings.whitelist = e ? t : [],
            this.setPersistedData(e ? t : [], "whitelist")
        },
        get whitelist() {
            return this.settings.whitelist
        },
        set userInput(t) {
            this.settings.userInput = !!t,
            this.setContentEditable(!!t)
        },
        get userInput() {
            return this.settings.userInput
        },
        generateClassSelectors: function(t) {
            var e = function(e) {
                var i = e;
                Object.defineProperty(t, i + "Selector", {
                    get: function() {
                        return "." + this[i].split(" ")[0]
                    }
                })
            };
            for (var i in t)
                e(i)
        },
        applySettings: function(t, e) {
            var i, n;
            x.templates = this.templates;
            var s = g({}, x, "mix" == e.mode ? {
                dropdown: {
                    position: "text"
                }
            } : {})
              , a = this.settings = g({}, s, e);
            if (a.disabled = t.hasAttribute("disabled"),
            a.readonly = a.readonly || t.hasAttribute("readonly"),
            a.placeholder = c(t.getAttribute("placeholder") || a.placeholder || ""),
            a.required = t.hasAttribute("required"),
            this.generateClassSelectors(a.classNames),
            void 0 === a.dropdown.includeSelectedTags && (a.dropdown.includeSelectedTags = a.duplicates),
            this.isIE && (a.autoComplete = !1),
            ["whitelist", "blacklist"].forEach((function(e) {
                var i = t.getAttribute("data-" + e);
                i && $(i = i.split(a.delimiters), Array) && (a[e] = i)
            }
            )),
            "autoComplete"in e && !u(e.autoComplete) && (a.autoComplete = x.autoComplete,
            a.autoComplete.enabled = e.autoComplete),
            "mix" == a.mode && (a.pattern = a.pattern || /@/,
            a.autoComplete.rightKey = !0,
            a.delimiters = e.delimiters || null,
            a.tagTextProp && !a.dropdown.searchKeys.includes(a.tagTextProp) && a.dropdown.searchKeys.push(a.tagTextProp)),
            t.pattern)
                try {
                    a.pattern = new RegExp(t.pattern)
                } catch (t) {}
            if (a.delimiters) {
                a._delimiters = a.delimiters;
                try {
                    a.delimiters = new RegExp(this.settings.delimiters,"g")
                } catch (t) {}
            }
            a.disabled && (a.userInput = !1),
            this.TEXTS = Q({}, V, a.texts || {}),
            ("select" != a.mode || (null === (i = e.dropdown) || void 0 === i ? void 0 : i.enabled)) && a.userInput || (a.dropdown.enabled = 0),
            a.dropdown.appendTarget = (null === (n = e.dropdown) || void 0 === n ? void 0 : n.appendTarget) || document.body;
            var o = this.getPersistedData("whitelist");
            Array.isArray(o) && (this.whitelist = Array.isArray(a.whitelist) ? h(a.whitelist, o) : o)
        },
        getAttributes: function(t) {
            var e, i = this.getCustomAttributes(t), n = "";
            for (e in i)
                n += " " + e + (void 0 !== t[e] ? '="'.concat(i[e], '"') : "");
            return n
        },
        getCustomAttributes: function(t) {
            if (!u(t))
                return "";
            var e, i = {};
            for (e in t)
                "__" != e.slice(0, 2) && "class" != e && t.hasOwnProperty(e) && void 0 !== t[e] && (i[e] = c(t[e]));
            return i
        },
        setStateSelection: function() {
            var t = window.getSelection()
              , e = {
                anchorOffset: t.anchorOffset,
                anchorNode: t.anchorNode,
                range: t.getRangeAt && t.rangeCount && t.getRangeAt(0)
            };
            return this.state.selection = e,
            e
        },
        getCSSVars: function() {
            var t, e, i, n = getComputedStyle(this.DOM.scope, null);
            this.CSSVars = {
                tagHideTransition: (t = function(t) {
                    if (!t)
                        return {};
                    var e = (t = t.trim().split(" ")[0]).split(/\d+/g).filter((function(t) {
                        return t
                    }
                    )).pop().trim();
                    return {
                        value: +t.split(e).filter((function(t) {
                            return t
                        }
                        ))[0].trim(),
                        unit: e
                    }
                }((i = "tag-hide-transition",
                n.getPropertyValue("--" + i))),
                e = t.value,
                "s" == t.unit ? 1e3 * e : e)
            }
        },
        build: function(t) {
            var e = this.DOM
              , i = t.closest("label");
            this.settings.mixMode.integrated ? (e.originalInput = null,
            e.scope = t,
            e.input = t) : (e.originalInput = t,
            e.originalInput_tabIndex = t.tabIndex,
            e.scope = this.parseTemplate("wrapper", [t, this.settings]),
            e.input = e.scope.querySelector(this.settings.classNames.inputSelector),
            t.parentNode.insertBefore(e.scope, t),
            t.tabIndex = -1),
            i && i.setAttribute("for", "")
        },
        destroy: function() {
            this.events.unbindGlobal.call(this),
            this.DOM.scope.parentNode.removeChild(this.DOM.scope),
            this.DOM.originalInput.tabIndex = this.DOM.originalInput_tabIndex,
            delete this.DOM.originalInput.__tagify,
            this.dropdown.hide(!0),
            this.removeAllCustomListeners(),
            clearTimeout(this.dropdownHide__bindEventsTimeout),
            clearInterval(this.listeners.main.originalInputValueObserverInterval)
        },
        loadOriginalValues: function(t) {
            var e, i = this.settings;
            if (this.state.blockChangeEvent = !0,
            void 0 === t) {
                var n = this.getPersistedData("value");
                t = n && !this.DOM.originalInput.value ? n : i.mixMode.integrated ? this.DOM.input.textContent : this.DOM.originalInput.value
            }
            if (this.removeAllTags(),
            t)
                if ("mix" == i.mode)
                    this.parseMixTags(t),
                    (e = this.DOM.input.lastChild) && "BR" == e.tagName || this.DOM.input.insertAdjacentHTML("beforeend", "<br>");
                else {
                    try {
                        $(JSON.parse(t), Array) && (t = JSON.parse(t))
                    } catch (t) {}
                    this.addTags(t, !0).forEach((function(t) {
                        return t && t.classList.add(i.classNames.tagNoAnimation)
                    }
                    ))
                }
            else
                this.postUpdate();
            this.state.lastOriginalValueReported = i.mixMode.integrated ? "" : this.DOM.originalInput.value
        },
        cloneEvent: function(t) {
            var e = {};
            for (var i in t)
                "path" != i && (e[i] = t[i]);
            return e
        },
        loading: function(t) {
            return this.state.isLoading = t,
            this.DOM.scope.classList[t ? "add" : "remove"](this.settings.classNames.scopeLoading),
            this
        },
        tagLoading: function(t, e) {
            return t && t.classList[e ? "add" : "remove"](this.settings.classNames.tagLoading),
            this
        },
        toggleClass: function(t, e) {
            "string" == typeof t && this.DOM.scope.classList.toggle(t, e)
        },
        toggleScopeValidation: function(t) {
            var e = !0 === t || void 0 === t;
            !this.settings.required && t && t === this.TEXTS.empty && (e = !0),
            this.toggleClass(this.settings.classNames.tagInvalid, !e),
            this.DOM.scope.title = e ? "" : t
        },
        toggleFocusClass: function(t) {
            this.toggleClass(this.settings.classNames.focus, !!t)
        },
        setPlaceholder: function(t) {
            var e = this;
            ["data", "aria"].forEach((function(i) {
                return e.DOM.input.setAttribute("".concat(i, "-placeholder"), t)
            }
            ))
        },
        triggerChangeEvent: function() {
            if (!this.settings.mixMode.integrated) {
                var t = this.DOM.originalInput
                  , e = this.state.lastOriginalValueReported !== t.value
                  , i = new CustomEvent("change",{
                    bubbles: !0
                });
                e && (this.state.lastOriginalValueReported = t.value,
                i.simulated = !0,
                t._valueTracker && t._valueTracker.setValue(Math.random()),
                t.dispatchEvent(i),
                this.trigger("change", this.state.lastOriginalValueReported),
                t.value = this.state.lastOriginalValueReported)
            }
        },
        events: X,
        fixFirefoxLastTagNoCaret: function() {},
        setRangeAtStartEnd: function(t, e) {
            if (e) {
                t = "number" == typeof t ? t : !!t,
                e = e.lastChild || e;
                var i = document.getSelection();
                if ($(i.focusNode, Element) && !this.DOM.input.contains(i.focusNode))
                    return !0;
                try {
                    i.rangeCount >= 1 && ["Start", "End"].forEach((function(n) {
                        return i.getRangeAt(0)["set" + n](e, t || e.length)
                    }
                    ))
                } catch (t) {
                    console.warn(t)
                }
            }
        },
        insertAfterTag: function(t, e) {
            if (e = e || this.settings.mixMode.insertAfterTag,
            t && t.parentNode && e)
                return e = "string" == typeof e ? document.createTextNode(e) : e,
                t.parentNode.insertBefore(e, t.nextSibling),
                e
        },
        editTagChangeDetected: function(t) {
            var e = t.__originalData;
            for (var i in e)
                if (!this.dataProps.includes(i) && t[i] != e[i])
                    return !0;
            return !1
        },
        getTagTextNode: function(t) {
            return t.querySelector(this.settings.classNames.tagTextSelector)
        },
        setTagTextNode: function(t, e) {
            this.getTagTextNode(t).innerHTML = c(e)
        },
        editTag: function(t, e) {
            var i = this;
            t = t || this.getLastTag(),
            e = e || {};
            var s = this.settings
              , a = this.getTagTextNode(t)
              , o = this.getNodeIndex(t)
              , r = w(t)
              , l = this.events.callbacks
              , d = !0
              , c = "select" == s.mode;
            if (!c && this.dropdown.hide(),
            a) {
                if (!$(r, Object) || !("editable"in r) || r.editable)
                    return r = w(t, {
                        __originalData: g({}, r),
                        __originalHTML: t.cloneNode(!0)
                    }),
                    w(r.__originalHTML, r.__originalData),
                    a.setAttribute("contenteditable", !0),
                    t.classList.add(s.classNames.tagEditing),
                    a.addEventListener("click", l.onEditTagClick.bind(this, t)),
                    a.addEventListener("blur", l.onEditTagBlur.bind(this, this.getTagTextNode(t))),
                    a.addEventListener("input", l.onEditTagInput.bind(this, a)),
                    a.addEventListener("paste", l.onEditTagPaste.bind(this, a)),
                    a.addEventListener("keydown", (function(e) {
                        return l.onEditTagkeydown.call(i, e, t)
                    }
                    )),
                    a.addEventListener("compositionstart", l.onCompositionStart.bind(this)),
                    a.addEventListener("compositionend", l.onCompositionEnd.bind(this)),
                    e.skipValidation || (d = this.editTagToggleValidity(t)),
                    a.originalIsValid = d,
                    this.trigger("edit:start", {
                        tag: t,
                        index: o,
                        data: r,
                        isValid: d
                    }),
                    a.focus(),
                    !c && this.setRangeAtStartEnd(!1, a),
                    0 === s.dropdown.enabled && !c && this.dropdown.show(),
                    this.state.hasFocus = !0,
                    this
            } else
                n.warn("Cannot find element in Tag template: .", s.classNames.tagTextSelector)
        },
        editTagToggleValidity: function(t, e) {
            var i;
            if (e = e || w(t))
                return (i = !("__isValid"in e) || !0 === e.__isValid) || this.removeTagsFromValue(t),
                this.update(),
                t.classList.toggle(this.settings.classNames.tagNotAllowed, !i),
                e.__isValid = i,
                e.__isValid;
            n.warn("tag has no data: ", t, e)
        },
        onEditTagDone: function(t, e) {
            t = t || this.state.editing.scope,
            e = e || {};
            var i, n, s = {
                tag: t,
                index: this.getNodeIndex(t),
                previousData: w(t),
                data: e
            }, a = this.settings;
            this.trigger("edit:beforeUpdate", s, {
                cloneData: !1
            }),
            this.state.editing = !1,
            delete e.__originalData,
            delete e.__originalHTML,
            t && (void 0 !== (n = e[a.tagTextProp]) ? null === (i = (n += "").trim) || void 0 === i ? void 0 : i.call(n) : a.tagTextProp in e ? void 0 : e.value) ? (t = this.replaceTag(t, e),
            this.editTagToggleValidity(t, e),
            a.a11y.focusableTags ? t.focus() : "select" != a.mode && T(t)) : t && this.removeTags(t),
            this.trigger("edit:updated", s),
            this.dropdown.hide(),
            this.settings.keepInvalidTags && this.reCheckInvalidTags()
        },
        replaceTag: function(t, e) {
            e && "" !== e.value && void 0 !== e.value || (e = t.__tagifyTagData),
            e.__isValid && 1 != e.__isValid && g(e, this.getInvalidTagAttrs(e, e.__isValid));
            var i = this.createTagElem(e);
            return t.parentNode.replaceChild(i, t),
            this.updateValueByDOMTags(),
            i
        },
        updateValueByDOMTags: function() {
            var t = this;
            this.value.length = 0,
            [].forEach.call(this.getTagElms(), (function(e) {
                e.classList.contains(t.settings.classNames.tagNotAllowed.split(" ")[0]) || t.value.push(w(e))
            }
            )),
            this.update()
        },
        injectAtCaret: function(t, e) {
            var i;
            if (!(e = e || (null === (i = this.state.selection) || void 0 === i ? void 0 : i.range)) && t)
                return this.appendMixTags(t),
                this;
            var n = y(t, e);
            return this.setRangeAtStartEnd(!1, n),
            this.updateValueByDOMTags(),
            this.update(),
            this
        },
        input: {
            set: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ""
                  , e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]
                  , i = this.settings.dropdown.closeOnSelect;
                this.state.inputText = t,
                e && (this.DOM.input.innerHTML = c("" + t)),
                !t && i && this.dropdown.hide.bind(this),
                this.input.autocomplete.suggest.call(this),
                this.input.validate.call(this)
            },
            raw: function() {
                return this.DOM.input.textContent
            },
            validate: function() {
                var t = !this.state.inputText || !0 === this.validateTag({
                    value: this.state.inputText
                });
                return this.DOM.input.classList.toggle(this.settings.classNames.inputInvalid, !t),
                t
            },
            normalize: function(t, e) {
                var i = t || this.DOM.input
                  , n = [];
                i.childNodes.forEach((function(t) {
                    return 3 == t.nodeType && n.push(t.nodeValue)
                }
                )),
                n = n.join("\n");
                try {
                    n = n.replace(/(?:\r\n|\r|\n)/g, this.settings.delimiters.source.charAt(0))
                } catch (t) {}
                return n = n.replace(/\s/g, " "),
                (null == e ? void 0 : e.trim) ? this.trim(n) : n
            },
            autocomplete: {
                suggest: function(t) {
                    if (this.settings.autoComplete.enabled) {
                        "object" != typeof (t = t || {
                            value: ""
                        }) && (t = {
                            value: t
                        });
                        var e = this.dropdown.getMappedValue(t);
                        if ("number" != typeof e) {
                            var i = this.state.inputText.toLowerCase()
                              , n = e.substr(0, this.state.inputText.length).toLowerCase()
                              , s = e.substring(this.state.inputText.length);
                            e && this.state.inputText && n == i ? (this.DOM.input.setAttribute("data-suggest", s),
                            this.state.inputSuggestion = t) : (this.DOM.input.removeAttribute("data-suggest"),
                            delete this.state.inputSuggestion)
                        }
                    }
                },
                set: function(t) {
                    var e = this.DOM.input.getAttribute("data-suggest")
                      , i = t || (e ? this.state.inputText + e : null);
                    return !!i && ("mix" == this.settings.mode ? this.replaceTextWithNode(document.createTextNode(this.state.tag.prefix + i)) : (this.input.set.call(this, i),
                    this.setRangeAtStartEnd(!1, this.DOM.input)),
                    this.input.autocomplete.suggest.call(this),
                    this.dropdown.hide(),
                    !0)
                }
            }
        },
        getTagIdx: function(t) {
            return this.value.findIndex((function(e) {
                return e.__tagId == (t || {}).__tagId
            }
            ))
        },
        getNodeIndex: function(t) {
            var e = 0;
            if (t)
                for (; t = t.previousElementSibling; )
                    e++;
            return e
        },
        getTagElms: function() {
            for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
                e[i] = arguments[i];
            var n = "." + Y(this.settings.classNames.tag.split(" ")).concat(Y(e)).join(".");
            return [].slice.call(this.DOM.scope.querySelectorAll(n))
        },
        getLastTag: function() {
            var t = this.settings.classNames
              , e = this.DOM.scope.querySelectorAll("".concat(t.tagSelector, ":not(.").concat(t.tagHide, "):not([readonly])"));
            return e[e.length - 1]
        },
        isTagDuplicate: function(t, e, i) {
            var n = 0;
            if ("select" == this.settings.mode)
                return !1;
            var a = !0
              , o = !1
              , r = void 0;
            try {
                for (var l, d = this.value[Symbol.iterator](); !(a = (l = d.next()).done); a = !0) {
                    var c = l.value;
                    s(this.trim("" + t), c.value, e) && i != c.__tagId && n++
                }
            } catch (t) {
                o = !0,
                r = t
            } finally {
                try {
                    a || null == d.return || d.return()
                } finally {
                    if (o)
                        throw r
                }
            }
            return n
        },
        getTagIndexByValue: function(t) {
            var e = this
              , i = []
              , n = this.settings.dropdown.caseSensitive;
            return this.getTagElms().forEach((function(a, o) {
                a.__tagifyTagData && s(e.trim(a.__tagifyTagData.value), t, n) && i.push(o)
            }
            )),
            i
        },
        getTagElmByValue: function(t) {
            var e = this.getTagIndexByValue(t)[0];
            return this.getTagElms()[e]
        },
        flashTag: function(t) {
            var e = this;
            t && (t.classList.add(this.settings.classNames.tagFlash),
            setTimeout((function() {
                t.classList.remove(e.settings.classNames.tagFlash)
            }
            ), 100))
        },
        isTagBlacklisted: function(t) {
            return t = this.trim(t.toLowerCase()),
            this.settings.blacklist.filter((function(e) {
                return ("" + e).toLowerCase() == t
            }
            )).length
        },
        isTagWhitelisted: function(t) {
            return !!this.getWhitelistItem(t)
        },
        getWhitelistItem: function(t, e, i) {
            e = e || "value";
            var n, a = this.settings;
            return (i = i || a.whitelist).some((function(i) {
                var o = "object" == typeof i ? i[e] || i.value : i;
                if (s(o, t, a.dropdown.caseSensitive, a.trim))
                    return n = "object" == typeof i ? i : {
                        value: i
                    },
                    !0
            }
            )),
            n || "value" != e || "value" == a.tagTextProp || (n = this.getWhitelistItem(t, a.tagTextProp, i)),
            n
        },
        validateTag: function(t) {
            var e = this.settings
              , i = "value"in t ? "value" : e.tagTextProp
              , n = this.trim(t[i] + "");
            return (t[i] + "").trim() ? "mix" != e.mode && e.pattern && $(e.pattern, RegExp) && !e.pattern.test(n) ? this.TEXTS.pattern : !e.duplicates && this.isTagDuplicate(n, e.dropdown.caseSensitive, t.__tagId) ? this.TEXTS.duplicate : this.isTagBlacklisted(n) || e.enforceWhitelist && !this.isTagWhitelisted(n) ? this.TEXTS.notAllowed : !e.validate || e.validate(t) : this.TEXTS.empty
        },
        getInvalidTagAttrs: function(t, e) {
            return {
                "aria-invalid": !0,
                class: "".concat(t.class || "", " ").concat(this.settings.classNames.tagNotAllowed).trim(),
                title: e
            }
        },
        hasMaxTags: function() {
            return this.value.length >= this.settings.maxTags && this.TEXTS.exceed
        },
        setReadonly: function(t, e) {
            var i = this.settings;
            this.DOM.scope.contains(document.activeElement) && document.activeElement.blur(),
            i[e || "readonly"] = t,
            this.DOM.scope[(t ? "set" : "remove") + "Attribute"](e || "readonly", !0),
            this.settings.userInput = !0,
            this.setContentEditable(!t)
        },
        setContentEditable: function(t) {
            this.DOM.input.contentEditable = t,
            this.DOM.input.tabIndex = t ? 0 : -1
        },
        setDisabled: function(t) {
            this.setReadonly(t, "disabled")
        },
        normalizeTags: function(t) {
            var e = this
              , i = this.settings
              , n = i.whitelist
              , s = i.delimiters
              , a = i.mode
              , o = i.tagTextProp
              , r = []
              , l = !!n && $(n[0], Object)
              , d = Array.isArray(t)
              , c = d && t[0].value
              , h = function(t) {
                return (t + "").split(s).reduce((function(t, i) {
                    var n, s = e.trim(i);
                    return s && t.push((G(n = {}, o, s),
                    G(n, "value", s),
                    n)),
                    t
                }
                ), [])
            };
            if ("number" == typeof t && (t = t.toString()),
            "string" == typeof t) {
                if (!t.trim())
                    return [];
                t = h(t)
            } else
                d && (t = t.reduce((function(t, i) {
                    if (u(i)) {
                        var n = g({}, i);
                        n[o] = e.trim(n[o]),
                        n[o] && t.push(n)
                    } else if (i) {
                        var s;
                        (s = t).push.apply(s, Y(h(i)))
                    }
                    return t
                }
                ), []));
            return l && !c && (t.forEach((function(t) {
                var i = r.map((function(t) {
                    return t.value
                }
                ))
                  , n = e.dropdown.filterListItems.call(e, t[o], {
                    exact: !0
                });
                e.settings.duplicates || (n = n.filter((function(t) {
                    return !i.includes(t.value)
                }
                )));
                var s = n.length > 1 ? e.getWhitelistItem(t[o], o, n) : n[0];
                s && $(s, Object) ? r.push(s) : "mix" != a && (null == t.value && (t.value = t[o]),
                r.push(t))
            }
            )),
            r.length && (t = r)),
            t
        },
        parseMixTags: function(t) {
            var e = this
              , i = this.settings
              , n = i.mixTagsInterpolator
              , s = i.duplicates
              , a = i.transformTag
              , o = i.enforceWhitelist
              , r = i.maxTags
              , l = i.tagTextProp
              , d = [];
            t = t.split(n[0]).map((function(t, i) {
                var c, u, g, h = t.split(n[1]), p = h[0], f = d.length == r;
                try {
                    if (p == +p)
                        throw Error;
                    u = JSON.parse(p)
                } catch (t) {
                    u = e.normalizeTags(p)[0] || {
                        value: p
                    }
                }
                if (a.call(e, u),
                f || !(h.length > 1) || o && !e.isTagWhitelisted(u.value) || !s && e.isTagDuplicate(u.value)) {
                    if (t)
                        return i ? n[0] + t : t
                } else
                    u[c = u[l] ? l : "value"] = e.trim(u[c]),
                    g = e.createTagElem(u),
                    d.push(u),
                    g.classList.add(e.settings.classNames.tagNoAnimation),
                    h[0] = g.outerHTML,
                    e.value.push(u);
                return h.join("")
            }
            )).join(""),
            this.DOM.input.innerHTML = t,
            this.DOM.input.appendChild(document.createTextNode("")),
            this.DOM.input.normalize();
            var c = this.getTagElms();
            return c.forEach((function(t, e) {
                return w(t, d[e])
            }
            )),
            this.update({
                withoutChangeEvent: !0
            }),
            O(c, this.state.hasFocus),
            t
        },
        replaceTextWithNode: function(t, e) {
            if (this.state.tag || e) {
                e = e || this.state.tag.prefix + this.state.tag.value;
                var i, n, s = this.state.selection || window.getSelection(), a = s.anchorNode, o = this.state.tag.delimiters ? this.state.tag.delimiters.length : 0;
                return a.splitText(s.anchorOffset - o),
                -1 == (i = a.nodeValue.lastIndexOf(e)) ? !0 : (n = a.splitText(i),
                t && a.parentNode.replaceChild(t, n),
                !0)
            }
        },
        prepareNewTagNode: function(t, e) {
            e = e || {};
            var i = this.settings
              , n = []
              , s = {}
              , a = Object.assign({}, t, {
                value: t.value + ""
            });
            if (t = Object.assign({}, a),
            i.transformTag.call(this, t),
            t.__isValid = this.hasMaxTags() || this.validateTag(t),
            !0 !== t.__isValid) {
                if (e.skipInvalid)
                    return;
                if (g(s, this.getInvalidTagAttrs(t, t.__isValid), {
                    __preInvalidData: a
                }),
                t.__isValid == this.TEXTS.duplicate && this.flashTag(this.getTagElmByValue(t.value)),
                !i.createInvalidTags)
                    return void n.push(t.value)
            }
            return "readonly"in t && (t.readonly ? s["aria-readonly"] = !0 : delete t.readonly),
            {
                tagElm: this.createTagElem(t, s),
                tagData: t,
                aggregatedInvalidInput: n
            }
        },
        postProcessNewTagNode: function(t, e) {
            var i = this
              , n = this.settings
              , s = e.__isValid;
            s && !0 === s ? (this.value.push(e),
            this.trigger("add", {
                tag: t,
                index: this.value.length - 1,
                data: e
            })) : (this.trigger("invalid", {
                data: e,
                index: this.value.length,
                tag: t,
                message: s
            }),
            n.keepInvalidTags || setTimeout((function() {
                return i.removeTags(t, !0)
            }
            ), 1e3)),
            this.dropdown.position()
        },
        selectTag: function(t, e) {
            var i = this;
            if (!this.settings.enforceWhitelist || this.isTagWhitelisted(e.value)) {
                this.state.actions.selectOption && setTimeout((function() {
                    return i.setRangeAtStartEnd(!1, i.DOM.input)
                }
                ));
                var n = this.getLastTag();
                return n ? this.replaceTag(n, e) : this.appendTag(t),
                this.value[0] = e,
                this.update(),
                this.trigger("add", {
                    tag: t,
                    data: e
                }),
                [t]
            }
        },
        addEmptyTag: function(t) {
            var e = g({
                value: ""
            }, t || {})
              , i = this.createTagElem(e);
            w(i, e),
            this.appendTag(i),
            this.editTag(i, {
                skipValidation: !0
            }),
            this.toggleFocusClass(!0)
        },
        addTags: function(t, e, i) {
            var n = this
              , s = []
              , a = this.settings
              , o = []
              , r = document.createDocumentFragment();
            if (!t || 0 == t.length)
                return s;
            switch (t = this.normalizeTags(t),
            a.mode) {
            case "mix":
                return this.addMixTags(t);
            case "select":
                e = !1,
                this.removeAllTags()
            }
            return this.DOM.input.removeAttribute("style"),
            t.forEach((function(t) {
                var e = n.prepareNewTagNode(t, {
                    skipInvalid: i || a.skipInvalid
                });
                if (e) {
                    var l = e.tagElm;
                    if (t = e.tagData,
                    o = e.aggregatedInvalidInput,
                    s.push(l),
                    "select" == a.mode)
                        return n.selectTag(l, t);
                    r.appendChild(l),
                    n.postProcessNewTagNode(l, t)
                }
            }
            )),
            this.appendTag(r),
            this.update(),
            t.length && e && (this.input.set.call(this, a.createInvalidTags ? "" : o.join(a._delimiters)),
            this.setRangeAtStartEnd(!1, this.DOM.input)),
            a.dropdown.enabled && this.dropdown.refilter(),
            s
        },
        addMixTags: function(t) {
            var e = this;
            if ((t = this.normalizeTags(t))[0].prefix || this.state.tag)
                return this.prefixedTextToTag(t[0]);
            var i = document.createDocumentFragment();
            return t.forEach((function(t) {
                var n = e.prepareNewTagNode(t);
                i.appendChild(n.tagElm),
                e.insertAfterTag(n.tagElm),
                e.postProcessNewTagNode(n.tagElm, n.tagData)
            }
            )),
            this.appendMixTags(i),
            i.children
        },
        appendMixTags: function(t) {
            var e = !!this.state.selection;
            e ? this.injectAtCaret(t) : (this.DOM.input.focus(),
            (e = this.setStateSelection()).range.setStart(this.DOM.input, e.range.endOffset),
            e.range.setEnd(this.DOM.input, e.range.endOffset),
            this.DOM.input.appendChild(t),
            this.updateValueByDOMTags(),
            this.update())
        },
        prefixedTextToTag: function(t) {
            var e, i, n, s = this, a = this.settings, o = null === (e = this.state.tag) || void 0 === e ? void 0 : e.delimiters;
            if (t.prefix = t.prefix || this.state.tag ? this.state.tag.prefix : (a.pattern.source || a.pattern)[0],
            n = this.prepareNewTagNode(t),
            i = n.tagElm,
            this.replaceTextWithNode(i) || this.DOM.input.appendChild(i),
            setTimeout((function() {
                return i.classList.add(s.settings.classNames.tagNoAnimation)
            }
            ), 300),
            this.value.push(n.tagData),
            this.update(),
            !o) {
                var r = this.insertAfterTag(i) || i;
                setTimeout(T, 0, r)
            }
            return this.state.tag = null,
            this.postProcessNewTagNode(i, n.tagData),
            i
        },
        appendTag: function(t) {
            var e = this.DOM
              , i = e.input;
            e.scope.insertBefore(t, i)
        },
        createTagElem: function(t, e) {
            t.__tagId = m();
            var i, n = g({}, t, Q({
                value: c(t.value + "")
            }, e));
            return function(t) {
                for (var e, i = document.createNodeIterator(t, NodeFilter.SHOW_TEXT, null, !1); e = i.nextNode(); )
                    e.textContent.trim() || e.parentNode.removeChild(e)
            }(i = this.parseTemplate("tag", [n, this])),
            w(i, t),
            i
        },
        reCheckInvalidTags: function() {
            var t = this
              , e = this.settings;
            this.getTagElms(e.classNames.tagNotAllowed).forEach((function(i, n) {
                var s = w(i)
                  , a = t.hasMaxTags()
                  , o = t.validateTag(s)
                  , r = !0 === o && !a;
                if ("select" == e.mode && t.toggleScopeValidation(o),
                r)
                    return s = s.__preInvalidData ? s.__preInvalidData : {
                        value: s.value
                    },
                    t.replaceTag(i, s);
                i.title = a || o
            }
            ))
        },
        removeTags: function(t, e, i) {
            var n, s = this, a = this.settings;
            if (t = t && $(t, HTMLElement) ? [t] : $(t, Array) ? t : t ? [t] : [this.getLastTag()].filter((function(t) {
                return t
            }
            )),
            n = t.reduce((function(t, e) {
                e && "string" == typeof e && (e = s.getTagElmByValue(e));
                var i = w(e);
                return e && i && !i.readonly && t.push({
                    node: e,
                    idx: s.getTagIdx(i),
                    data: w(e, {
                        __removed: !0
                    })
                }),
                t
            }
            ), []),
            i = "number" == typeof i ? i : this.CSSVars.tagHideTransition,
            "select" == a.mode && (i = 0,
            this.input.set.call(this)),
            1 == n.length && "select" != a.mode && n[0].node.classList.contains(a.classNames.tagNotAllowed) && (e = !0),
            n.length)
                return a.hooks.beforeRemoveTag(n, {
                    tagify: this
                }).then((function() {
                    var t = function(t) {
                        t.node.parentNode && (t.node.parentNode.removeChild(t.node),
                        e ? a.keepInvalidTags && this.trigger("remove", {
                            tag: t.node,
                            index: t.idx
                        }) : (this.trigger("remove", {
                            tag: t.node,
                            index: t.idx,
                            data: t.data
                        }),
                        this.dropdown.refilter(),
                        this.dropdown.position(),
                        this.DOM.input.normalize(),
                        a.keepInvalidTags && this.reCheckInvalidTags()))
                    };
                    i && i > 10 && 1 == n.length ? function(e) {
                        e.node.style.width = parseFloat(window.getComputedStyle(e.node).width) + "px",
                        document.body.clientTop,
                        e.node.classList.add(a.classNames.tagHide),
                        setTimeout(t.bind(this), i, e)
                    }
                    .call(s, n[0]) : n.forEach(t.bind(s)),
                    e || (s.removeTagsFromValue(n.map((function(t) {
                        return t.node
                    }
                    ))),
                    s.update(),
                    "select" == a.mode && a.userInput && s.setContentEditable(!0))
                }
                )).catch((function(t) {}
                ))
        },
        removeTagsFromDOM: function() {
            this.getTagElms().forEach((function(t) {
                return t.remove()
            }
            ))
        },
        removeTagsFromValue: function(t) {
            var e = this;
            (t = Array.isArray(t) ? t : [t]).forEach((function(t) {
                var i = w(t)
                  , n = e.getTagIdx(i);
                n > -1 && e.value.splice(n, 1)
            }
            ))
        },
        removeAllTags: function(t) {
            var e = this;
            t = t || {},
            this.value = [],
            "mix" == this.settings.mode ? this.DOM.input.innerHTML = "" : this.removeTagsFromDOM(),
            this.dropdown.refilter(),
            this.dropdown.position(),
            this.state.dropdown.visible && setTimeout((function() {
                e.DOM.input.focus()
            }
            )),
            "select" == this.settings.mode && (this.input.set.call(this),
            this.settings.userInput && this.setContentEditable(!0)),
            this.update(t)
        },
        postUpdate: function() {
            this.state.blockChangeEvent = !1;
            var t, e, i = this.settings, n = i.classNames, s = "mix" == i.mode ? i.mixMode.integrated ? this.DOM.input.textContent : this.DOM.originalInput.value.trim() : this.value.length + this.input.raw.call(this).length;
            (this.toggleClass(n.hasMaxTags, this.value.length >= i.maxTags),
            this.toggleClass(n.hasNoTags, !this.value.length),
            this.toggleClass(n.empty, !s),
            "select" == i.mode) && this.toggleScopeValidation(null === (e = this.value) || void 0 === e || null === (t = e[0]) || void 0 === t ? void 0 : t.__isValid)
        },
        setOriginalInputValue: function(t) {
            var e = this.DOM.originalInput;
            this.settings.mixMode.integrated || (e.value = t,
            e.tagifyValue = e.value,
            this.setPersistedData(t, "value"))
        },
        update: function(t) {
            clearTimeout(this.debouncedUpdateTimeout),
            this.debouncedUpdateTimeout = setTimeout(function() {
                var e = this.getInputValue();
                this.setOriginalInputValue(e),
                this.settings.onChangeAfterBlur && (t || {}).withoutChangeEvent || this.state.blockChangeEvent || this.triggerChangeEvent();
                this.postUpdate()
            }
            .bind(this), 100),
            this.events.bindOriginaInputListener.call(this, 100)
        },
        getInputValue: function() {
            var t = this.getCleanValue();
            return "mix" == this.settings.mode ? this.getMixedTagsAsString(t) : t.length ? this.settings.originalInputValueFormat ? this.settings.originalInputValueFormat(t) : JSON.stringify(t) : ""
        },
        getCleanValue: function(t) {
            return a(t || this.value, this.dataProps)
        },
        getMixedTagsAsString: function() {
            var t = ""
              , e = this
              , i = this.settings
              , n = i.originalInputValueFormat || JSON.stringify
              , s = i.mixTagsInterpolator;
            return function i(a) {
                a.childNodes.forEach((function(a) {
                    if (1 == a.nodeType) {
                        var r = w(a);
                        if ("BR" == a.tagName && (t += "\r\n"),
                        r && v.call(e, a)) {
                            if (r.__removed)
                                return;
                            t += s[0] + n(o(r, e.dataProps)) + s[1]
                        } else
                            a.getAttribute("style") || ["B", "I", "U"].includes(a.tagName) ? t += a.textContent : "DIV" != a.tagName && "P" != a.tagName || (t += "\r\n",
                            i(a))
                    } else
                        t += a.textContent
                }
                ))
            }(this.DOM.input),
            t
        }
    },
    Z.prototype.removeTag = Z.prototype.removeTags,
    Z
}
));
//# sourceMappingURL=tagify.js.map
