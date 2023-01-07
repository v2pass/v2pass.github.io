function renameImage(t, n, e) {
    var o = {
        action: "edit",
        image: t,
        name: n
    };
    return e && (o.hash = e), sendAjax("POST", "/json", o, function(e) {
        document.querySelector('[data-remove="' + t + '"] .imagetitle').setAttribute("data-name", n)
    }), !1
}

function renameGallery(e, t) {
    if ("" != t.trim()) return sendAjax("POST", "/json", {
        action: "edit",
        album: e,
        name: t
    }, function(e) {
        1 == e.refresh && "/files" == window.location.pathname && window.location.reload()
    }), !1
}

function initThumbs(e) {
    for (var t = e.getElementsByClassName("fa-trash-o"), n = 0; n < t.length; n++) mobilecheck() || "" == t[n].parentNode.textContent && set_tooltips(t[n], removeLabel, {
        placement: "top"
    }), t[n].parentNode.getAttribute("data-action") && (t[n].parentNode.onclick = function() {
        var t = this.getAttribute("data-action"),
            e = "gallery" == t ? confirm(galleryRemove) : confirm(imageRemove);
        if (e) {
            for (var n, o, i, a = this, r = "gallery" == t ? "data-gallery" : "data-remove", s = 5; s && (s--, !(a = a.parentNode).getAttribute(r)););
            var l, c = a.getAttribute(r);
            c && (l = {}, "gallery" == t ? l.gallery = c : (l.image = c, o = a.getAttribute("data-gallery"), n = a.getAttribute("data-image"), (i = a.getAttribute("data-hash")) && (l.hash = i)), sendAjax("DELETE", "/json", l, function(e) {
                "gallery" == t ? "/files" == window.location.pathname ? (a.classList.remove("gallery-container"), a.classList.add("fade"), setTimeout(function() {
                    a.classList.add("hidden")
                }, 200), "undefined" != typeof page_offset && page_offset--) : window.location.href = "/files" : "imagelist" == t ? (a.classList.remove("thumb-container"), a.classList.add("fade"), setTimeout(function() {
                    a.classList.add("hidden")
                }, 200), "undefined" != typeof page_offset && page_offset--, void 0 !== embed_value[n] && (delete embed_value[n], set_embed())) : window.location.href = o ? "/gallery/" + o + "/" : "/"
            }))
        }
        return !1
    });
    for (var o = e.getElementsByClassName("fa-codes"), n = 0; n < o.length; n++) mobilecheck() || "" == o[n].parentNode.textContent && set_tooltips(o[n], shareLabel, {
        placement: "top"
    }), "" == o[n].parentNode.textContent && (o[n].parentNode.onclick = function() {
        var e, t;
        void 0 !== e && e || (e = ""), void 0 !== t && t || (t = "");
        for (var n = this, o = 5; o && (o--, !(n = n.parentNode).classList.contains("thumb-container")););
        var i = n.getAttribute("data-image"),
            a = n.getAttribute("data-hotlink"),
            r = n.getAttribute("data-ext"),
            s = n.getAttribute("data-name"),
            l = n.getAttribute("data-homepage");
        return filename = s.replace(/[\s@;:~<>#"']/g, "_"), "." == filename[0] && (filename = filename.substring(1)), Object.keys(embed_tpl).map(function(e, t) {
            var n = embed_tpl[e];
            n = (n = (n = (n = (n = (n = n.replace(new RegExp("%HEX%", "g"), i)).replace(new RegExp("%NAME%", "g"), filename)).replace(new RegExp("%EXT%", "g"), r)).replace(new RegExp("%HOTLINK%", "g"), a)).replace(new RegExp("%URL_IMAGE%", "g"), image_url)).replace(new RegExp("%URL_CDN%", "g"), image_url.replace("://", "://i.", "g")), n = 0 < l ? (n = n.replace(new RegExp("%URL%", "g"), root_url), 1 < l ? n.replace(new RegExp("%URL_THUMB%", "g"), root_url) : n.replace(new RegExp("%URL_THUMB%", "g"), image_url + i)) : (n = n.replace(new RegExp("%URL%", "g"), image_url + i)).replace(new RegExp("%URL_THUMB%", "g"), image_url + i), get("linksModal").querySelector('input[id="' + e + '"]').value = n
        }), new Modal(get("linksModal")).show(), !1
    });
    for (var i = e.getElementsByClassName("fa-cog"), n = 0; n < i.length; n++) mobilecheck() || "" == i[n].parentNode.textContent && set_tooltips(i[n], settingsLabel, {
        placement: "top"
    }), "#settingsModal" != i[n].parentNode.getAttribute("data-target") && (i[n].parentNode.setAttribute("data-target", "#settingsModal"), new Modal(i[n].parentNode)), i[n].parentNode.onclick = function() {
        for (var e = this, t = 5; t && (t--, !(e = e.parentNode).getAttribute("data-gallery")););
        return hex = e.getAttribute("data-image"), hex ? (Button(get("saveImageSettings"), "reset"), get("settingsImageForm").querySelector('input[name="hex"]').value = e.getAttribute("data-remove"), get("settingsImageForm").querySelector('select[name="gallery"]').value = e.getAttribute("data-gallery"), get("settingsModal").classList.add("fade"), get("settingsModal").addEventListener("shown.bs.modal", function(e) {
            get("settingsImageForm").querySelector('input[name="image_name"]').focus()
        }, !1)) : (hex = e.getAttribute("data-gallery"), hex && (Button(get("saveSettingsBtn"), "reset"), get("settingsForm").querySelector('input[name="hex"]').value = hex, get("settingsForm").style.visibility = "hidden", get("settingsModal").classList.add("fade"), get("settingsModal").addEventListener("shown.bs.modal", function(e) {
            get("settingsForm").querySelector('input[name="gallery_name"]').focus()
        }, !1), sendAjax("POST", "/json", {
            action: "settings",
            album: hex
        }, function(e) {
            "uploadtime" == e.settings.sort_field ? get("settingsForm").querySelector("select[name=sortfield] option[value=uploadtime]").selected = !0 : get("settingsForm").querySelector("select[name=sortfield] option[value=filename]").selected = !0, "asc" == e.settings.sort_order ? (get("settingsForm").querySelector("input[name=sortorder][value=desc]").checked = !1, get("settingsForm").querySelector("input[name=sortorder][value=asc]").checked = !0, get("settingsForm").querySelector("input[name=sortorder][value=desc]").parentNode.classList.remove("active"), get("settingsForm").querySelector("input[name=sortorder][value=asc]").parentNode.classList.add("active")) : (get("settingsForm").querySelector("input[name=sortorder][value=asc]").checked = !1, get("settingsForm").querySelector("input[name=sortorder][value=desc]").checked = !0, get("settingsForm").querySelector("input[name=sortorder][value=asc]").parentNode.classList.remove("active"), get("settingsForm").querySelector("input[name=sortorder][value=desc]").parentNode.classList.add("active")), get("settingsForm").querySelector("input[name=gallery_name]").value = e.settings.name, get("settingsForm").style.visibility = "visible"
        }))), !1
    };
    for (var a = e.getElementsByClassName("fa-clock-o"), n = 0; n < a.length; n++) mobilecheck() || set_tooltips(a[n], a[n].getAttribute("title"), {
        placement: "top"
    });
    for (var r = e.getElementsByClassName("gallery"), n = 0; n < r.length; n++) {
        var s = r[n].getElementsByTagName("h3")[0];
        s.addEventListener("blur", function(e) {
            if ("" == this.textContent.trim()) return "" == this.getAttribute("data-name") ? this.textContent = defaultLabel : this.textContent = this.getAttribute("data-name"), !1;
            this.getAttribute("data-name") != this.textContent && (renameGallery(this.getAttribute("data-hex"), this.textContent), this.setAttribute("data-name", this.textContent.trim()))
        }, !1), s.addEventListener("focus", function(e) {
            "" == this.getAttribute("data-name") && (this.textContent = "")
        }, !1), s.addEventListener("keydown", function(e) {
            27 == e.keyCode && (this.textContent = this.getAttribute("data-name"), this.blur())
        }, !1), s.addEventListener("keypress", function(e) {
            13 == (e.keyCode || e.charCode || e.which) && (e.preventDefault(), this.blur())
        }, !1)
    }
    for (var l = e.getElementsByClassName("imagetitle"), n = 0; n < l.length; n++) l[n].addEventListener("keydown", function(e) {
        27 == e.keyCode && (this.textContent = this.parentNode.parentNode.getAttribute("data-name"), this.blur())
    }, !1), l[n].addEventListener("keypress", function(e) {
        13 == (e.keyCode || e.charCode || e.which) && (e.preventDefault(), this.blur())
    }, !1), l[n].addEventListener("blur", function(e) {
        "" == this.textContent && (this.textContent = "image"), this.getAttribute("data-name") != this.textContent && renameImage(this.parentNode.parentNode.getAttribute("data-remove"), this.textContent, this.parentNode.parentNode.getAttribute("data-hash"))
    }, !1)
}

function fallbackMessage(e) {
    var t = "cut" === e ? "X" : "C";
    return /iPhone|iPad/i.test(navigator.userAgent) ? "Please copy manualy" : /Mac/i.test(navigator.userAgent) ? "Press ⌘-" + t + " to " + e : "Press Ctrl-" + t + " to " + e
}

function addGallery() {
    var e = get("add_gallery_name"),
        t = e.value.trim();
    return "" == t ? e.focus() : sendAjax("POST", "/json", {
        action: "add",
        name: t
    }, function(e) {
        e.url_html ? window.location.href = e.url_html : window.location.href = "/files"
    }), !1
}

function saveSettings(e) {
    Button(get("saveSettingsBtn"), "loading");
    var t = get("settingsForm").querySelector("input[name=hex]").value,
        n = get("settingsForm").querySelector("select[name=sortfield] option:checked").value,
        o = get("settingsForm").querySelector("input[name=sortorder]:checked").value,
        i = get("settingsForm").querySelector("input[name=gallery_name]").value;
    return sendAjax("POST", "/json", {
        action: "edit",
        album: t,
        sort_field: n,
        sort_order: o,
        name: i
    }, function(e) {
        1 == e.refresh && "/files" != window.location.pathname && window.location.reload(), void 0 !== get("settingsModal").modalTrigger && (Button(get("saveSettingsBtn"), "reset"), get("settingsModal").modalTrigger.Modal.hide()), "" != i.trim() && (document.querySelector('h3[data-hex="' + t + '"]') && (document.querySelector('h3[data-hex="' + t + '"]').innerHTML = i), document.querySelector('a[data-hex="' + t + '"]') && (document.querySelector('a[data-hex="' + t + '"]').innerHTML = i))
    }), !1
}

function saveImageSettings(e) {
    Button(get("saveImageSettings"), "loading");
    var t = get("settingsImageForm").querySelector('input[name="hex"]').value,
        n = get("settingsImageForm").querySelector('input[name="image_name"]').value,
        o = get("settingsImageForm").querySelector('input[name="cover"]:checked').value,
        i = get("settingsImageForm").querySelector('select[name="gallery"]');
    return sendAjax("POST", "/json", {
        action: "edit",
        image: t,
        name: n,
        gallery: i.value,
        cover: o
    }, function(e) {
        1 == e.refresh && window.location.pathname != "/" + t && window.location.reload(), void 0 !== get("settingsModal").modalTrigger && (Button(get("saveImageSettings"), "reset"), get("settingsModal").modalTrigger.Modal.hide()), document.querySelector('a[data-hex="' + t + '"]') && (document.querySelector('a[data-hex="' + t + '"]').innerHTML = i.options[i.selectedIndex].text, document.querySelector('a[data-hex="' + t + '"]').setAttribute("href", "/gallery/" + i.value)), "" != n.trim() && document.querySelector('li[data-hex="' + t + '"]') && (document.querySelector('li[data-hex="' + t + '"]').innerHTML = n)
    }), !1
}

function set_tooltips(e, t, n) {
    return void 0 !== e.Tooltip ? e.Tooltip : (e.setAttribute("title", t), new Tooltip(e, n))
}

function share_init() {
    var e = new Clipboard("[data-clipboard-target]");
    e.on("success", function(e) {
        set_tooltips(e.trigger, copiedMessage, {
            placement: "left",
            pause: !0
        }).show(), e.clearSelection()
    }), e.on("error", function(e) {
        set_tooltips(e.trigger, fallbackMessage(e.action), {
            placement: "left",
            pause: !0
        }).show()
    });
    for (var t = document.querySelectorAll("[data-clipboard-target]"), n = 0; n < t.length; n++) t[n].addEventListener("shown.bs.tooltip", function(e) {
        var t = this;
        setTimeout(function() {
            t.Tooltip.hide()
        }, 1e3);
        for (var n = document.querySelectorAll("[data-clipboard-target]"), o = 0; o < n.length; o++) t != n[o] && void 0 !== n[o].Tooltip && n[o].Tooltip.hide()
    }, !1);
    for (var o = document.getElementsByTagName("input"), n = 0; n < o.length; n++) 0 == o[n].id.indexOf("code_") && o[n].addEventListener("focus", function(e) {
        this.onmouseup = function() {
            return this.onmouseup = function() {}, this.select(), !1
        }, this.select()
    }, !0)
}! function() {
    var e, s = document,
        t = this.Document || this.HTMLDocument,
        a = window,
        n = this.constructor || this.Window || Window,
        o = "HTMLElement",
        l = "documentElement",
        i = Element,
        r = "classList",
        c = "class",
        u = "setAttribute",
        d = "prototype",
        f = "indexOf",
        h = "length",
        m = "split",
        p = "Event",
        g = "CustomEvent",
        v = "_events",
        y = "type",
        b = "target",
        w = "currentTarget",
        x = "relatedTarget",
        E = "cancelable",
        _ = "bubbles",
        T = "cancelBubble",
        k = "cancelImmediate",
        L = "detail",
        S = "addEventListener",
        C = "removeEventListener",
        A = "dispatchEvent";
    a[o] || (a[o] = a[i]), Array[d][f] || (Array[d][f] = function(e) {
        if (null == this) throw new TypeError(this + " is not an object");
        for (var t = this instanceof String ? this[m]("") : this, n = Math.max(Math.min(t[h], 9007199254740991), 0) || 0, o = ((o = Number(arguments[1]) || 0) < 0 ? Math.max(n + o, 0) : o) - 1; ++o < n;)
            if (o in t && t[o] === e) return o;
        return -1
    }), r in i[d] || (e = function(t) {
        var n = (t.getAttribute(c) || "").replace(/^\s+|\s+$/g, "")[m](/\s+/) || [];
        hasClass = this.contains = function(e) {
            return -1 < n[f](e)
        }, addClass = this.add = function(e) {
            hasClass(e) || (n.push(e), t[u](c, n.join(" ")))
        }, removeClass = this.remove = function(e) {
            hasClass(e) && (n.splice(n[f](e), 1), t[u](c, n.join(" ")))
        }, toggleClass = this.toggle = function(e) {
            (hasClass(e) ? removeClass : addClass)(e)
        }
    }, Object.defineProperty(i[d], r, {
        get: function() {
            return new e(this)
        }
    })), a[p] && n[d][p] || (a[p] = n[d][p] = t[d][p] = i[d][p] = function(e, t) {
        if (!e) throw new Error("Not enough arguments");
        var n, o = !(!t || void 0 === t[_]) && t[_],
            i = !(!t || void 0 === t[E]) && t[E];
        return "createEvent" in s ? (n = s.createEvent(p)).initEvent(e, o, i) : ((n = s.createEventObject())[y] = e, n[_] = o, n[E] = i), n
    }), g in a && g in n[d] || (a[g] = n[d][g] = t[d][g] = Element[d][g] = function(e, t) {
        if (!e) throw Error("CustomEvent TypeError: An event name must be provided.");
        var n = new Event(e, t);
        return n[L] = t && t[L] || null, n
    }), a[S] && n[d][S] || (a[S] = n[d][S] = t[d][S] = i[d][S] = function() {
        var r = this,
            e = arguments[0],
            t = arguments[1];
        r[v] || (r[v] = {}), r[v][e] || (r[v][e] = function(e) {
            var t, n = r[v][e[y]].list,
                o = n.slice(),
                i = -1,
                a = o[h];
            for (e.preventDefault = function() {
                    !1 !== e[E] && (e.returnValue = !1)
                }, e.stopPropagation = function() {
                    e[T] = !0
                }, e.stopImmediatePropagation = function() {
                    e[T] = !0, e[k] = !0
                }, e[w] = r, e[x] = e[x] || e.fromElement || null, e[b] = e[b] || e.srcElement || r, e.timeStamp = (new Date).getTime(), e.clientX && (e.pageX = e.clientX + s[l].scrollLeft, e.pageY = e.clientY + s[l].scrollTop); ++i < a && !e[k];) i in o && (t = o[i], -1 !== n[f](t) && "function" == typeof t && t.call(r, e))
        }, r[v][e].list = [], r.attachEvent && r.attachEvent("on" + e, r[v][e])), r[v][e].list.push(t)
    }, a[C] = n[d][C] = t[d][C] = i[d][C] = function() {
        var e, t = this,
            n = arguments[0],
            o = arguments[1];
        t[v] && t[v][n] && t[v][n].list && -1 !== (e = t[v][n].list[f](o)) && (t[v][n].list.splice(e, 1), t[v][n].list[h] || (t.detachEvent && t.detachEvent("on" + n, t[v][n]), delete t[v][n]))
    }), a[A] && n[d][A] && t[d][A] && i[d][A] || (a[A] = n[d][A] = t[d][A] = i[d][A] = function(t) {
        if (!arguments[h]) throw new Error("Not enough arguments");
        if (!t || "string" != typeof t[y]) throw new Error("DOM Events Exception 0");
        var n, o = this,
            i = t[y];
        try {
            t[_] || (t[T] = !0, n = function(e) {
                e[T] = !0, (o || a).detachEvent("on" + i, n)
            }, this.attachEvent("on" + i, n)), this.fireEvent("on" + i, t)
        } catch (e) {
            for (t[b] = o; t[w] = o, v in o && "function" == typeof o[v][i] && o[v][i].call(o, t), "function" == typeof o["on" + i] && o["on" + i].call(o, t), (o = 9 === o.nodeType ? o.parentWindow : o.parentNode) && !t[T];);
        }
        return !0
    })
}(),
function(e, t) {
    var n;
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof module && module.exports ? module.exports = t() : (n = t(), e.Button = n.Button, e.Collapse = n.Collapse, e.Modal = n.Modal, e.Tab = n.Tab, e.Tooltip = n.Tooltip)
}(this, function() {
    function C(e) {
        e.focus ? e.focus() : e.setActive()
    }

    function A(e, t) {
        e.classList.add(t)
    }

    function M(e, t) {
        e.classList.remove(t)
    }

    function q(e, t) {
        return e.classList.contains(t)
    }

    function N(e, t) {
        return function(e) {
            for (var t = [], n = 0, o = e[me]; n < o; n++) t.push(e[n]);
            return t
        }(e[s ? g : "getElementsByClassName"](s ? "." + t.replace(/\s(?=[a-z])/g, ".") : t))
    }

    function O(e, t) {
        var n = t || document;
        return "object" == typeof e ? e : n.querySelector(e)
    }

    function w(e, t) {
        for (var n = t.charAt(0); e && e !== document; e = e[he])
            if ("." === n) {
                if (null !== O(t, e[he]) && q(e, t.replace(".", ""))) return e
            } else if ("#" === n && e.id === t.substr(1)) return e;
        return !1
    }

    function F(e, t, n) {
        e.addEventListener(t, n, !1)
    }

    function B(e, t, n) {
        e.removeEventListener(t, n, !1)
    }

    function I(e, t) {
        var n, o, i;
        Le ? (i = function(e) {
            t(e)
        }, F(n = e, o = Se, function e(t) {
            i(t), B(n, o, e)
        })) : t()
    }

    function j(e, t, n) {
        var o = new CustomEvent(e + ".bs." + t);
        o.relatedTarget = n, this.dispatchEvent(o)
    }

    function e(e, t, n, o) {
        for (var i = o && o[me] ? o : Ce, a = 0; a < i[me]; a++) {
            var r = i[a][le](n),
                s = e.replace(/spy/i, "")[c]();
            (r && e === l && -1 < r[f](s) || r === s) && new t(i[a])
        }
    }

    function y(e) {
        for (var t, n, o, i, a, r, s = 0, l = 0, c = e.children[me]; l < c; l++) s += (t = e.children[l], n = void 0, n = t && (t.currentStyle || R.getComputedStyle(t)), o = /px/.test(n.borderTopWidth) ? Math.round(n.borderTopWidth.replace("px", "")) : 0, i = /px/.test(n.borderBottomWidth) ? Math.round(n.borderBottomWidth.replace("px", "")) : 0, a = /px/.test(n.marginTop) ? Math.round(n.marginTop.replace("px", "")) : 0, r = /px/.test(n.marginBottom) ? Math.round(n.marginBottom.replace("px", "")) : 0, t[J] + parseInt(o) + parseInt(i) + parseInt(a) + parseInt(r));
        return s
    }

    function x(e, t, n, o) {
        var i = e[fe](),
            a = o === z ? {
                y: R.pageYOffset || H[u],
                x: R.pageXOffset || H[d]
            } : {
                x: o.offsetLeft + o[d],
                y: o.offsetTop + o[u]
            },
            r = i[we] - i[be],
            s = i[Ee] - i.top,
            l = t[V],
            c = t[Q];
        n === xe ? (t[pe].top = i.top + a.y - c + "px", t[pe][be] = i[be] + a.x - l / 2 + r / 2 + "px") : n === Ee ? (t[pe].top = i.top + a.y + s + "px", t[pe][be] = i[be] + a.x - l / 2 + r / 2 + "px") : n === be ? (t[pe].top = i.top + a.y - c / 2 + s / 2 + "px", t[pe][be] = i[be] + a.x - l + "px") : n === we && (t[pe].top = i.top + a.y - c / 2 + s / 2 + "px", t[pe][be] = i[be] + a.x + r + "px"), -1 === t.className[f](n) && (t.className = t.className.replace(v, n))
    }

    function t(c, e) {
        c = O(c), e = e || null;
        var u = !1,
            d = "button",
            f = "checked";
        q(c, "btn") && null !== e && ("reset" !== e ? e && "reset" !== e && ("loading" === e && (A(c, a), c[ce](a, a)), c[ce](n, c.innerHTML.replace(/^\s+|\s+$/g, "")), c.innerHTML = c[le]("data-" + e + "-text")) : c[le](n) && (!q(c, a) && c[le](a) !== a || (M(c, a), c.removeAttribute(a)), c.innerHTML = c[le](n))), q(c, "btn-group") && (l in c || F(c, ne, function(e) {
            var t = e[K][he],
                n = "LABEL" === e[K].tagName ? e[K] : "LABEL" === t.tagName ? t : null;
            if (n) {
                var o = N(this, "btn"),
                    i = n[de]("INPUT")[0];
                if (i) {
                    if ("checkbox" === i.type && (i[f] ? (M(n, ge), i[le](f), i.removeAttribute(f), i[f] = !1) : (A(n, ge), i[le](f), i[ce](f, f), i[f] = !0), u || (u = !0, j.call(i, h, d), j.call(c, h, d))), "radio" === i.type && !u && !i[f]) {
                        A(n, ge), i[ce](f, f), i[f] = !0, j.call(i, h, d), j.call(c, h, d), u = !0;
                        for (var a = 0, r = o[me]; a < r; a++) {
                            var s = o[a],
                                l = s[de]("INPUT")[0];
                            s !== n && q(s, ge) && (M(s, ge), l.removeAttribute(f), l[f] = !1, j.call(l, h, d))
                        }
                    }
                    setTimeout(function() {
                        u = !1
                    }, 50)
                }
            }
        }), c[l] = this)
    }
    var R = "undefined" != typeof global ? global : this || window,
        H = document.documentElement,
        z = document.body,
        b = "data-toggle",
        P = "data-dismiss",
        l = "Button",
        r = "Collapse",
        X = "Modal",
        E = "Tooltip",
        U = "data-backdrop",
        D = "data-target",
        _ = "data-original-title",
        n = "data-original-text",
        W = "backdrop",
        G = "keyboard",
        T = "delay",
        Y = "content",
        K = "target",
        k = "pause",
        L = "animation",
        S = "placement",
        Z = "container",
        u = "scrollTop",
        d = "scrollLeft",
        $ = "clientWidth",
        J = "clientHeight",
        V = "offsetWidth",
        Q = "offsetHeight",
        ee = "innerWidth",
        m = "height",
        p = "aria-expanded",
        te = "aria-hidden",
        ne = "click",
        oe = "keydown",
        ie = "show",
        ae = "shown",
        re = "hide",
        se = "hidden",
        h = "change",
        le = "getAttribute",
        ce = "setAttribute",
        ue = "hasAttribute",
        de = "getElementsByTagName",
        fe = "getBoundingClientRect",
        g = "querySelectorAll",
        f = "indexOf",
        he = "parentNode",
        me = "length",
        c = "toLowerCase",
        o = "Transition",
        i = "Webkit",
        pe = "style",
        ge = "active",
        ve = "in",
        ye = "collapsing",
        a = "disabled",
        be = "left",
        we = "right",
        xe = "top",
        Ee = "bottom",
        s = !("opacity" in z[pe]),
        _e = "navbar-fixed-top",
        Te = "navbar-fixed-bottom",
        ke = "onmouseleave" in document ? ["mouseenter", "mouseleave"] : ["mouseover", "mouseout"],
        v = /\b(top|bottom|left|top)+/,
        Le = i + o in H[pe] || o[c]() in H[pe],
        Se = i + o in H[pe] ? i[c]() + o + "End" : o[c]() + "end",
        Ce = document[de]("*"),
        Ae = /^\#(.)+$/;
    e(l, t, b);

    function Me(s, e) {
        function l(e) {
            j.call(e, re, f), d = !0, e[pe][m] = y(e) + "px", setTimeout(function() {
                A(e, ye), e[pe][m] = "0px", I(e, function() {
                    d = !1, e[ce](p, "false"), M(e, ye), M(e, ve), e[pe][m] = "", j.call(e, se, f)
                })
            }, 20)
        }
        s = O(s), e = e || {};
        var t, n, o, c = null,
            u = null,
            i = this,
            d = !1,
            a = s[le]("data-parent"),
            f = "collapse",
            h = "collapsed";
        this.toggle = function(e) {
            e.preventDefault(), d || (q(u, ve) ? i.hide() : i.show())
        }, this.hide = function() {
            l(u), A(s, h)
        }, this.show = function() {
            var e;
            if (j.call(e = u, ie, f), d = !0, A(e, ye), A(e, ve), setTimeout(function() {
                    e[pe][m] = y(e) + "px", I(e, function() {
                        d = !1, e[ce](p, "true"), M(e, ye), e[pe][m] = "", j.call(e, ae, f)
                    })
                }, 20), M(s, h), null !== c) {
                for (var t = N(c, f + " " + ve), n = c[g]("[" + b + '="' + f + '"]'), o = 0, i = t[me]; o < i; o++) t[o] !== u && l(t[o]);
                for (var a = 0, r = n[me]; a < r; a++)((n[a][le](D) || n[a].href).split("#")[1] !== u.id ? A : M)(n[a], h)
            }
        }, r in s || F(s, ne, this.toggle), t = s.href && s[le]("href"), n = s[le](D), o = t || n && Ae.test(n) && n, u = o && O(o), c = O(e.parent) || a && w(s, a), s[r] = this
    }
    e(r, Me, b);

    function qe(n, e) {
        var o, i, a, r, s, l, c, u, d, f, h, m, p, g, v, t, y, b, w = (n = O(n))[le](D) || n[le]("href"),
            x = O(w),
            E = q(n, "modal") ? n : x,
            _ = "modal",
            T = "static",
            k = "paddingLeft",
            L = "paddingRight",
            S = "modal-backdrop";
        q(n, "modal") && (n = null), E && (e = e || {}, this[G] = !1 !== e[G] && "false" !== E[le]("data-keyboard"), this[W] = e[W] !== T && E[le](U) !== T || T, this[W] = !1 !== e[W] && "false" !== E[le](U) && this[W], this[Y] = e[Y], i = (o = this).open = !1, a = null, u = N(H, _e).concat(N(H, Te)), d = function() {
            var e, t = z.currentStyle || R.getComputedStyle(z),
                n = parseInt(t[L], 10);
            if (r && (z[pe][L] = n + l + "px", u[me]))
                for (var o = 0; o < u[me]; o++) e = R.getComputedStyle(u[o])[L], u[o][pe][L] = parseInt(e) + l + "px"
        }, f = function() {
            var e, t, n;
            r = z[$] < (e = H[fe](), R[ee] || e[we] - Math.abs(e[be])), s = E.scrollHeight > H[J], (n = document.createElement("div")).className = _ + "-scrollbar-measure", z.appendChild(n), t = n[V] - n[$], z.removeChild(n), l = t
        }, h = function() {
            E[pe][k] = !r && s ? l + "px" : "", E[pe][L] = r && !s ? l + "px" : ""
        }, m = function() {
            (q(E, ve) ? B : F)(document, oe, y)
        }, p = function() {
            (q(E, ve) ? B : F)(R, "resize", o.update)
        }, g = function() {
            (q(E, ve) ? B : F)(E, ne, b)
        }, v = function() {
            i = o.open = !0, C(E), j.call(E, ae, _, a)
        }, t = function() {
            p(), g(), m(), E[pe].display = "", i = o.open = !1, n && C(n), j.call(E, se, _), setTimeout(function() {
                N(document, _ + " " + ve)[0] || (E[pe][k] = "", E[pe][L] = "", function() {
                    if (z[pe][L] = "", u[me])
                        for (var e = 0; e < u[me]; e++) u[e][pe][L] = ""
                }(), M(z, _ + "-open"), (c = O("." + S)) && null !== c && "object" == typeof c && (z.removeChild(c), c = null))
            }, 100)
        }, y = function(e) {
            var t = e.which || e.keyCode;
            o[G] && 27 == t && i && o.hide()
        }, b = function(e) {
            var t = e[K];
            i && (t[he][le](P) === _ || t[le](P) === _ || t === E && o[W] !== T) && (o.hide(), a = null, e.preventDefault())
        }, this.toggle = function() {
            i && q(E, ve) ? this.hide() : this.show()
        }, this.show = function() {
            j.call(E, ie, _, a);
            var e, t = N(document, _ + " in")[0];
            t && t !== E && t.modalTrigger[X].hide(), this[W] && (e = document.createElement("div"), null === (c = O("." + S)) && (e[ce]("class", S + " fade"), c = e, z.appendChild(c))), c && !q(c, ve) && setTimeout(function() {
                A(c, ve)
            }, 0), setTimeout(function() {
                E[pe].display = "block", f(), d(), h(), p(), g(), m(), A(z, _ + "-open"), A(E, ve), E[ce](te, !1), q(E, "fade") ? I(E, v) : v()
            }, Le ? 150 : 0)
        }, this.hide = function() {
            j.call(E, re, _), c = O("." + S), M(E, ve), E[ce](te, !0), c && M(c, ve), setTimeout(function() {
                q(E, "fade") ? I(E, t) : t()
            }, Le ? 150 : 0)
        }, this.setContent = function(e) {
            O(".modal-content", E).innerHTML = e
        }, this.update = function() {
            i && (f(), d(), h())
        }, !n || X in n || F(n, ne, function(e) {
            var t = (t = e[K])[ue](D) || t[ue]("href") ? t : t[he];
            i || t !== n || q(E, ve) || (E.modalTrigger = n, a = n, o.show(), e.preventDefault())
        }), this[Y] && this.setContent(this[Y]), n && (n[X] = this))
    }
    e(X, qe, b);

    function Ne(e, t) {
        var n = (e = O(e))[le]("data-height"),
            o = "tab",
            i = "height",
            a = "isAnimating";

        function r() {
            j.call(l, ae, o, u), c ? setTimeout(function() {
                c[pe][i] = "", M(c, ye), u[a] = l[a] = !1
            }, 200) : u[a] = l[a] = !1
        }

        function s() {
            M(d, ge), A(f, ge), setTimeout(function() {
                A(f, ve), f[Q], c && A(c, ye), j.call(l, ie, o, u), c && (c[pe][i] = y(f) + "px"), j.call(u, se, o, l)
            }, 20)
        }
        e[a] = !1, t = t || {}, this[i] = Le && (t[i] || "true" === n);
        var l, c, u, d, f, h, m, p = this,
            g = w(e, ".nav"),
            v = g && O(".dropdown", g);
        g && (h = function() {
            var e, t = N(g, ge);
            return 1 !== t[me] || q(t[0], "dropdown") ? 1 < t[me] && (e = t[t[me] - 1]) : e = t[0], e[de]("A")[0]
        }, m = function() {
            return O(h()[le]("href"))
        }, this.show = function() {
            f = O((l = l || e)[le]("href")), u = h(), d = m(), u[a] && l[a] || q(l[he], ge) || (u[a] = l[a] = !0, M(u[he], ge), A(l[he], ge), v && (q(e[he][he], "dropdown-menu") ? q(v, ge) || A(v, ge) : q(v, ge) && M(v, ge)), c && (c[pe][i] = y(d) + "px"), M(d, ve), j.call(u, re, o, l), q(d, "fade") ? I(d, s) : s(), q(f, "fade") ? I(f, r) : r())
        }, "Tab" in e || F(e, ne, function(e) {
            e.preventDefault(), l = e[K][le](b) === o || Ae.test(e[K][le]("href")) ? e[K] : e[K][he], p.show()
        }), this[i] && (c = m()[he]), e.Tab = this)
    }
    e("Tab", Ne, b);

    function Oe(n, e) {
        var t = (n = O(n))[le]("data-animation"),
            o = n[le]("data-placement"),
            i = n[le]("data-delay"),
            a = n[le]("data-container"),
            r = "tooltip",
            s = "class",
            l = "title",
            c = w(n, ".modal"),
            u = w(n, "." + _e),
            d = w(n, "." + Te);
        e = e || {}, this[L] = e[L] && "fade" !== e[L] ? e[L] : t || "fade", this[S] = e[S] ? e[S] : o || xe, this[k] = !!e[k] && e[k], this[T] = parseInt(e[T] || i) || 200, this[Z] = O(e[Z]) ? O(e[Z]) : O(a) ? O(a) : u || (d || (c || z));
        var f, h, m, p = this,
            g = 0,
            v = this[S],
            y = null,
            b = n[le](l) || n[le](_);
        b && (f = function() {
            var e, t;
            x(n, y, v, p[Z]), 0 <= (t = y[fe]()).top && 0 <= t[be] && t[Ee] <= (R.innerHeight || H[J]) && t[we] <= (R[ee] || H[$]) || x(n, y, v = (e = v) === xe ? Ee : e === Ee ? xe : e === be ? we : e === we ? be : e, p[Z])
        }, h = function() {
            j.call(n, ae, r)
        }, m = function() {
            p[Z].removeChild(y), g = y = null, j.call(n, se, r)
        }, this.show = function() {
            clearTimeout(g), g = setTimeout(function() {
                null === y && (v = p[S], function() {
                    b = n[le](l) || n[le](_), (y = document.createElement("div"))[ce]("role", r);
                    var e = document.createElement("div"),
                        t = document.createElement("div");
                    e[ce](s, r + "-arrow"), t[ce](s, r + "-inner"), y.appendChild(e), y.appendChild(t), t.innerHTML = b, p[Z].appendChild(y), y[ce](s, r + " " + v + " " + p[L])
                }(), f(), q(y, ve) || A(y, ve), j.call(n, ie, r), p[L] ? I(y, h) : h())
            }, 20)
        }, this.hide = function() {
            clearTimeout(g), g = setTimeout(function() {
                y && null !== y && q(y, ve) && (j.call(n, re, r), M(y, ve), p[L] ? I(y, m) : m())
            }, p[T])
        }, this.toggle = function() {
            y ? p.hide() : p.show()
        }, E in n || (n[ce](_, b), n.removeAttribute(l), p[k] || (F(n, ke[0], this.show), F(n, ke[1], this.hide))), n[E] = this)
    }
    return e(E, Oe, b), {
        Button: t,
        Collapse: Me,
        Modal: qe,
        Tab: Ne,
        Tooltip: Oe
    }
}), window.mobilecheck = function() {
        var e, t = !1;
        return e = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0, 4))) && (t = !0), t
    }, initThumbs(document), get("addGalleryBtn") && (get("addGalleryBtn").onclick = addGallery, document.querySelector('form[name="addgallery"]').addEventListener("submit", function(e) {
        addGallery(), e.preventDefault()
    }, !1)), get("saveSettingsBtn") && (get("saveSettingsBtn").onclick = saveSettings, get("settingsForm").addEventListener("submit", function(e) {
        saveSettings(), e.preventDefault()
    }, !1)), get("saveImageSettings") && (get("saveImageSettings").onclick = saveImageSettings, get("settingsImageForm").addEventListener("submit", function(e) {
        saveImageSettings(), e.preventDefault()
    }, !1)),
    function(e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).Clipboard = e()
    }(function() {
        return function a(r, s, l) {
            function c(n, e) {
                if (!s[n]) {
                    if (!r[n]) {
                        var t = "function" == typeof require && require;
                        if (!e && t) return t(n, !0);
                        if (u) return u(n, !0);
                        var o = new Error("Cannot find module '" + n + "'");
                        throw o.code = "MODULE_NOT_FOUND", o
                    }
                    var i = s[n] = {
                        exports: {}
                    };
                    r[n][0].call(i.exports, function(e) {
                        var t = r[n][1][e];
                        return c(t || e)
                    }, i, i.exports, a, r, s, l)
                }
                return s[n].exports
            }
            for (var u = "function" == typeof require && require, e = 0; e < l.length; e++) c(l[e]);
            return c
        }({
            1: [function(e, t, n) {
                var o;
                "undefined" == typeof Element || Element.prototype.matches || ((o = Element.prototype).matches = o.matchesSelector || o.mozMatchesSelector || o.msMatchesSelector || o.oMatchesSelector || o.webkitMatchesSelector), t.exports = function(e, t) {
                    for (; e && 9 !== e.nodeType;) {
                        if ("function" == typeof e.matches && e.matches(t)) return e;
                        e = e.parentNode
                    }
                }
            }, {}],
            2: [function(e, t, n) {
                var r = e("./closest");
                t.exports = function(e, t, n, o, i) {
                    var a = function(t, n, e, o) {
                        return function(e) {
                            e.delegateTarget = r(e.target, n), e.delegateTarget && o.call(t, e)
                        }
                    }.apply(this, arguments);
                    return e.addEventListener(n, a, i), {
                        destroy: function() {
                            e.removeEventListener(n, a, i)
                        }
                    }
                }
            }, {
                "./closest": 1
            }],
            3: [function(e, t, n) {
                n.node = function(e) {
                    return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
                }, n.nodeList = function(e) {
                    var t = Object.prototype.toString.call(e);
                    return void 0 !== e && ("[object NodeList]" === t || "[object HTMLCollection]" === t) && "length" in e && (0 === e.length || n.node(e[0]))
                }, n.string = function(e) {
                    return "string" == typeof e || e instanceof String
                }, n.fn = function(e) {
                    return "[object Function]" === Object.prototype.toString.call(e)
                }
            }, {}],
            4: [function(e, t, n) {
                var f = e("./is"),
                    h = e("delegate");
                t.exports = function(e, t, n) {
                    if (!e && !t && !n) throw new Error("Missing required arguments");
                    if (!f.string(t)) throw new TypeError("Second argument must be a String");
                    if (!f.fn(n)) throw new TypeError("Third argument must be a Function");
                    if (f.node(e)) return u = t, d = n, (c = e).addEventListener(u, d), {
                        destroy: function() {
                            c.removeEventListener(u, d)
                        }
                    };
                    if (f.nodeList(e)) return r = e, s = t, l = n, Array.prototype.forEach.call(r, function(e) {
                        e.addEventListener(s, l)
                    }), {
                        destroy: function() {
                            Array.prototype.forEach.call(r, function(e) {
                                e.removeEventListener(s, l)
                            })
                        }
                    };
                    if (f.string(e)) return o = e, i = t, a = n, h(document.body, o, i, a);
                    throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                    var o, i, a, r, s, l, c, u, d
                }
            }, {
                "./is": 3,
                delegate: 2
            }],
            5: [function(e, t, n) {
                t.exports = function(e) {
                    var t, n, o, i = "SELECT" === e.nodeName ? (e.focus(), e.value) : "INPUT" === e.nodeName || "TEXTAREA" === e.nodeName ? ((t = e.hasAttribute("readonly")) || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value.length), t || e.removeAttribute("readonly"), e.value) : (e.hasAttribute("contenteditable") && e.focus(), n = window.getSelection(), (o = document.createRange()).selectNodeContents(e), n.removeAllRanges(), n.addRange(o), n.toString());
                    return i
                }
            }, {}],
            6: [function(e, t, n) {
                function o() {}
                o.prototype = {
                    on: function(e, t, n) {
                        var o = this.e || (this.e = {});
                        return (o[e] || (o[e] = [])).push({
                            fn: t,
                            ctx: n
                        }), this
                    },
                    once: function(e, t, n) {
                        var o = this;

                        function i() {
                            o.off(e, i), t.apply(n, arguments)
                        }
                        return i._ = t, this.on(e, i, n)
                    },
                    emit: function(e) {
                        for (var t = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[e] || []).slice(), o = 0, i = n.length; o < i; o++) n[o].fn.apply(n[o].ctx, t);
                        return this
                    },
                    off: function(e, t) {
                        var n = this.e || (this.e = {}),
                            o = n[e],
                            i = [];
                        if (o && t)
                            for (var a = 0, r = o.length; a < r; a++) o[a].fn !== t && o[a].fn._ !== t && i.push(o[a]);
                        return i.length ? n[e] = i : delete n[e], this
                    }
                }, t.exports = o
            }, {}],
            7: [function(e, t, n) {
                var o, i, a;
                o = this, i = function(e, t) {
                    "use strict";
                    var n, o = (n = t) && n.__esModule ? n : {
                        default: n
                    };
                    var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    };

                    function a(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    var r = (function(e, t, n) {
                        return t && a(e.prototype, t), n && a(e, n), e
                    }(s, [{
                        key: "resolveOptions",
                        value: function(e) {
                            var t = 0 < arguments.length && void 0 !== e ? e : {};
                            this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = ""
                        }
                    }, {
                        key: "initSelection",
                        value: function() {
                            this.text ? this.selectFake() : this.target && this.selectTarget()
                        }
                    }, {
                        key: "selectFake",
                        value: function() {
                            var e = this,
                                t = "rtl" == document.documentElement.getAttribute("dir");
                            this.removeFake(), this.fakeHandlerCallback = function() {
                                return e.removeFake()
                            }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[t ? "right" : "left"] = "-9999px";
                            var n = window.pageYOffset || document.documentElement.scrollTop;
                            this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, o.default)(this.fakeElem), this.copyText()
                        }
                    }, {
                        key: "removeFake",
                        value: function() {
                            this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
                        }
                    }, {
                        key: "selectTarget",
                        value: function() {
                            this.selectedText = (0, o.default)(this.target), this.copyText()
                        }
                    }, {
                        key: "copyText",
                        value: function() {
                            var t = void 0;
                            try {
                                t = document.execCommand(this.action)
                            } catch (e) {
                                t = !1
                            }
                            this.handleResult(t)
                        }
                    }, {
                        key: "handleResult",
                        value: function(e) {
                            this.emitter.emit(e ? "success" : "error", {
                                action: this.action,
                                text: this.selectedText,
                                trigger: this.trigger,
                                clearSelection: this.clearSelection.bind(this)
                            })
                        }
                    }, {
                        key: "clearSelection",
                        value: function() {
                            this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges()
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this.removeFake()
                        }
                    }, {
                        key: "action",
                        set: function(e) {
                            var t = 0 < arguments.length && void 0 !== e ? e : "copy";
                            if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                        },
                        get: function() {
                            return this._action
                        }
                    }, {
                        key: "target",
                        set: function(e) {
                            if (void 0 !== e) {
                                if (!e || "object" !== (void 0 === e ? "undefined" : i(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                this._target = e
                            }
                        },
                        get: function() {
                            return this._target
                        }
                    }]), s);

                    function s(e) {
                        ! function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, s), this.resolveOptions(e), this.initSelection()
                    }
                    e.exports = r
                }, void 0 !== n ? i(t, e("select")) : (i(a = {
                    exports: {}
                }, o.select), o.clipboardAction = a.exports)
            }, {
                select: 5
            }],
            8: [function(e, t, n) {
                var o, i, a;
                o = this, i = function(e, t, n, o) {
                    "use strict";
                    var i = s(t),
                        a = s(n),
                        r = s(o);

                    function s(e) {
                        return e && e.__esModule ? e : {
                            default: e
                        }
                    }
                    var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                        return typeof e
                    } : function(e) {
                        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                    };
                    var c = function(e, t, n) {
                        return t && u(e.prototype, t), n && u(e, n), e
                    };

                    function u(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var o = t[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    var d = (function(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(f, a.default), c(f, [{
                        key: "resolveOptions",
                        value: function(e) {
                            var t = 0 < arguments.length && void 0 !== e ? e : {};
                            this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText, this.container = "object" === l(t.container) ? t.container : document.body
                        }
                    }, {
                        key: "listenClick",
                        value: function(e) {
                            var t = this;
                            this.listener = (0, r.default)(e, "click", function(e) {
                                return t.onClick(e)
                            })
                        }
                    }, {
                        key: "onClick",
                        value: function(e) {
                            var t = e.delegateTarget || e.currentTarget;
                            this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new i.default({
                                action: this.action(t),
                                target: this.target(t),
                                text: this.text(t),
                                container: this.container,
                                trigger: t,
                                emitter: this
                            })
                        }
                    }, {
                        key: "defaultAction",
                        value: function(e) {
                            return h("action", e)
                        }
                    }, {
                        key: "defaultTarget",
                        value: function(e) {
                            var t = h("target", e);
                            if (t) return document.querySelector(t)
                        }
                    }, {
                        key: "defaultText",
                        value: function(e) {
                            return h("text", e)
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                        }
                    }], [{
                        key: "isSupported",
                        value: function(e) {
                            var t = 0 < arguments.length && void 0 !== e ? e : ["copy", "cut"],
                                n = "string" == typeof t ? [t] : t,
                                o = !!document.queryCommandSupported;
                            return n.forEach(function(e) {
                                o = o && !!document.queryCommandSupported(e)
                            }), o
                        }
                    }]), f);

                    function f(e, t) {
                        ! function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, f);
                        var n = function(e, t) {
                            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this));
                        return n.resolveOptions(t), n.listenClick(e), n
                    }

                    function h(e, t) {
                        var n = "data-clipboard-" + e;
                        if (t.hasAttribute(n)) return t.getAttribute(n)
                    }
                    e.exports = d
                }, void 0 !== n ? i(t, e("./clipboard-action"), e("tiny-emitter"), e("good-listener")) : (i(a = {
                    exports: {}
                }, o.clipboardAction, o.tinyEmitter, o.goodListener), o.clipboard = a.exports)
            }, {
                "./clipboard-action": 7,
                "good-listener": 4,
                "tiny-emitter": 6
            }]
        }, {}, [8])(8)
    }), share_init();
for (var zoomtimer, slideout, fixed, share_list = document.getElementsByClassName("sh-link"), i = 0; i < share_list.length; i++) share_list[i].onclick = function(e) {
    e.preventDefault();
    var t = this.getAttribute("data-href");
    void 0 !== t && ("mailto" == t.substring(0, 6) && mobilecheck() ? window.location = t : window.open(t))
};

function get(e) {
    return document.getElementById(e)
}

function sendAjax(e, t, n, o) {
    var i = "string" == typeof n ? n : Object.keys(n).filter(function(e) {
            return void 0 !== n[e]
        }).map(function(e) {
            return encodeURIComponent(e) + "=" + encodeURIComponent(n[e])
        }).join("&"),
        a = new XMLHttpRequest;
    return a.onreadystatechange = function() {
        if (4 == this.readyState && "function" == typeof o)
            if (200 == this.status) try {
                o(JSON.parse(this.response))
            } catch (e) {} else if (get("apiModal")) {
                try {
                    get("apierror").innerHTML = JSON.parse(this.response).error.message
                } catch (e) {
                    get("apierror").innerHTML = networkError
                }
                new Modal(get("apiModal")).show()
            }
    }, a.open(e, t, !0), a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), a.setRequestHeader("X-Requested-With", "XMLHttpRequest"), a.timeout = 5e3, a.send(i), a
}

function bot_test() {
    return get("antibot").value = "test", !0
}

function escapeHtml(e) {
    var t = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    };
    return e.replace(/[&<>"']/g, function(e) {
        return t[e]
    })
}

function setCookie(e, t, n) {
    var o, i = (n = n || {}).expires;
    "number" == typeof i && i && ((o = new Date).setTime(o.getTime() + 1e3 * i * 3600 * 24), i = n.expires = o);
    var a = e + "=" + (t = encodeURIComponent(t));
    for (var r in n) {
        a += "; " + r;
        var s = n[r];
        !0 !== s && (a += "=" + s)
    }
    document.cookie = a
}

function setUploadCookie() {
    setCookie(this.name, this.value, {
        expires: 31,
        path: "/"
    })
}
get("zoombtn") && (window.onresize = function() {
        clearTimeout(zoomtimer), zoomtimer = setTimeout(makeImageZoomable, 100)
    }, get("main-image").onclick = function(e) {
        var t, n = get("download").getAttribute("href");
        void 0 !== n && (get("full-image").getElementsByTagName("img")[0].setAttribute("src", n.substring(0, n.indexOf("?"))), get("show-image").classList.add("hidden"), get("full-image").classList.remove("hidden"), get("zoombtn").classList.add("zoomed"), (t = get("zoombtn").getElementsByClassName("fa-search-plus")[0]) && (t.classList.remove("fa-search-plus"), t.classList.add("fa-search-minus")))
    }, get("full-image").onclick = function(e) {
        get("zoombtn").classList.remove("zoomed"), get("full-image").classList.add("hidden");
        var t = get("zoombtn").getElementsByClassName("fa-search-minus")[0];
        t && (t.classList.remove("fa-search-minus"), t.classList.add("fa-search-plus")), get("sb-main").scrollTop = 0, get("sb-main").scrollLeft = 0, get("show-image").classList.remove("hidden"), makeImageZoomable()
    }, get("zoombtn").onclick = function(e) {
        e.preventDefault(), this.classList.contains("zoomed") ? get("full-image").click() : get("main-image").click()
    }), document.querySelector('select[id="gallery"]') && (document.querySelector('select[id="gallery"]').onchange = setUploadCookie), document.querySelector('select[id="optsize"]') && (document.querySelector('select[id="optsize"]').onchange = setUploadCookie), document.querySelector('select[id="expire"]') && (document.querySelector('select[id="expire"]').onchange = setUploadCookie), get("abuseBtn") && (get("abuseBtn").onclick = function(e) {
        var t = get("controls").getAttribute("data-image");
        Button(this, "loading"), sendAjax("POST", "/json", {
            report: t
        }, function(e) {
            get("abuseBtn").classList.add("hidden"), get("abuseReport").style.color = "#008030", get("abuseReport").textContent = "Thanks for your complaint! This image will be reviewed by our staff."
        })
    }),
    function(e) {
        var t;
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.Slideout = e())
    }(function() {
        return function a(r, s, l) {
            function c(n, e) {
                if (!s[n]) {
                    if (!r[n]) {
                        var t = "function" == typeof require && require;
                        if (!e && t) return t(n, !0);
                        if (u) return u(n, !0);
                        var o = new Error("Cannot find module '" + n + "'");
                        throw o.code = "MODULE_NOT_FOUND", o
                    }
                    var i = s[n] = {
                        exports: {}
                    };
                    r[n][0].call(i.exports, function(e) {
                        var t = r[n][1][e];
                        return c(t || e)
                    }, i, i.exports, a, r, s, l)
                }
                return s[n].exports
            }
            for (var u = "function" == typeof require && require, e = 0; e < l.length; e++) c(l[e]);
            return c
        }({
            1: [function(e, t, n) {
                "use strict";
                var o, i, a, r = e("decouple"),
                    s = e("emitter"),
                    l = !1,
                    c = window.document,
                    u = c.documentElement,
                    d = window.navigator.msPointerEnabled,
                    f = {
                        start: d ? "MSPointerDown" : "touchstart",
                        move: d ? "MSPointerMove" : "touchmove",
                        end: d ? "MSPointerUp" : "touchend"
                    },
                    h = function() {
                        var e = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/,
                            t = c.getElementsByTagName("script")[0].style;
                        for (var n in t)
                            if (e.test(n)) return "-" + n.match(e)[0].toLowerCase() + "-";
                        return "WebkitOpacity" in t ? "-webkit-" : "KhtmlOpacity" in t ? "-khtml-" : ""
                    }();

                function m(e) {
                    e = e || {}, this._startOffsetX = 0, this._currentOffsetX = 0, this._opening = !1, this._moved = !1, this._opened = !1, this._preventOpen = !1, this._touch = (void 0 === e.touch || e.touch) && !0, this._side = e.side || "left", this.panel = e.panel, this.menu = e.menu, this.panel.classList.contains("slideout-panel") || this.panel.classList.add("slideout-panel"), this.panel.classList.contains("slideout-panel-" + this._side) || this.panel.classList.add("slideout-panel-" + this._side), this.menu.classList.contains("slideout-menu") || this.menu.classList.add("slideout-menu"), this.menu.classList.contains("slideout-menu-" + this._side) || this.menu.classList.add("slideout-menu-" + this._side), this._fx = e.fx || "ease", this._duration = parseInt(e.duration, 10) || 300, this._tolerance = parseInt(e.tolerance, 10) || 70, this._padding = this._translateTo = parseInt(e.padding, 10) || 256, this._orientation = "right" === this._side ? -1 : 1, this._translateTo *= this._orientation, this._touch && this._initTouchEvents()
                }
                a = s, (i = m).prototype = function(e, t) {
                    for (var n in t) t[n] && (e[n] = t[n]);
                    return e
                }(i.prototype || {}, a.prototype), m.prototype.open = function() {
                    var e = this;
                    return this.emit("beforeopen"), u.classList.contains("slideout-open") || u.classList.add("slideout-open"), this._setTransition(), this._translateXTo(this._translateTo), this._opened = !0, setTimeout(function() {
                        e.panel.style.transition = e.panel.style["-webkit-transition"] = "", e.emit("open")
                    }, this._duration + 50), this
                }, m.prototype.close = function() {
                    var e = this;
                    return (this.isOpen() || this._opening) && (this.emit("beforeclose"), this._setTransition(), this._translateXTo(0), this._opened = !1, setTimeout(function() {
                        u.classList.remove("slideout-open"), e.panel.style.transition = e.panel.style["-webkit-transition"] = e.panel.style[h + "transform"] = e.panel.style.transform = "", e.emit("close")
                    }, this._duration + 50)), this
                }, m.prototype.toggle = function() {
                    return this.isOpen() ? this.close() : this.open()
                }, m.prototype.isOpen = function() {
                    return this._opened
                }, m.prototype._translateXTo = function(e) {
                    return this._currentOffsetX = e, this.panel.style[h + "transform"] = this.panel.style.transform = "translateX(" + e + "px)", this
                }, m.prototype._setTransition = function() {
                    return this.panel.style[h + "transition"] = this.panel.style.transition = h + "transform " + this._duration + "ms " + this._fx, this
                }, m.prototype._initTouchEvents = function() {
                    var i = this;
                    return this._onScrollFn = r(c, "scroll", function() {
                        i._moved || (clearTimeout(o), l = !0, o = setTimeout(function() {
                            l = !1
                        }, 250))
                    }), this._preventMove = function(e) {
                        i._moved && e.preventDefault()
                    }, c.addEventListener(f.move, this._preventMove), this._resetTouchFn = function(e) {
                        void 0 !== e.touches && (i._moved = !1, i._opening = !1, i._startOffsetX = e.touches[0].pageX, i._preventOpen = !i._touch || !i.isOpen() && 0 !== i.menu.clientWidth)
                    }, this.panel.addEventListener(f.start, this._resetTouchFn), this._onTouchCancelFn = function() {
                        i._moved = !1, i._opening = !1
                    }, this.panel.addEventListener("touchcancel", this._onTouchCancelFn), this._onTouchEndFn = function() {
                        i._moved && (i.emit("translateend"), i._opening && Math.abs(i._currentOffsetX) > i._tolerance ? i.open() : i.close()), i._moved = !1
                    }, this.panel.addEventListener(f.end, this._onTouchEndFn), this._onTouchMoveFn = function(e) {
                        if (!(l || i._preventOpen || void 0 === e.touches || function(e) {
                                for (; e.parentNode;) {
                                    if (null !== e.getAttribute("data-slideout-ignore")) return e;
                                    e = e.parentNode
                                }
                            }(e.target))) {
                            var t = e.touches[0].clientX - i._startOffsetX,
                                n = i._currentOffsetX = t;
                            if (!(Math.abs(n) > i._padding) && 20 < Math.abs(t)) {
                                i._opening = !0;
                                var o = t * i._orientation;
                                if (i._opened && 0 < o || !i._opened && o < 0) return;
                                i._moved || i.emit("translatestart"), o <= 0 && (n = t + i._padding * i._orientation, i._opening = !1), i._moved && u.classList.contains("slideout-open") || u.classList.add("slideout-open"), i.panel.style[h + "transform"] = i.panel.style.transform = "translateX(" + n + "px)", i.emit("translate", n), i._moved = !0
                            }
                        }
                    }, this.panel.addEventListener(f.move, this._onTouchMoveFn), this
                }, m.prototype.enableTouch = function() {
                    return this._touch = !0, this
                }, m.prototype.disableTouch = function() {
                    return this._touch = !1, this
                }, m.prototype.destroy = function() {
                    return this.close(), c.removeEventListener(f.move, this._preventMove), this.panel.removeEventListener(f.start, this._resetTouchFn), this.panel.removeEventListener("touchcancel", this._onTouchCancelFn), this.panel.removeEventListener(f.end, this._onTouchEndFn), this.panel.removeEventListener(f.move, this._onTouchMoveFn), c.removeEventListener("scroll", this._onScrollFn), this.open = this.close = function() {}, this
                }, t.exports = m
            }, {
                decouple: 2,
                emitter: 3
            }],
            2: [function(e, t, n) {
                "use strict";
                var s = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
                    window.setTimeout(e, 1e3 / 60)
                };
                t.exports = function(e, t, n) {
                    var o, i = !1;

                    function a(e) {
                        o = e, i || (s(r), i = !0)
                    }

                    function r() {
                        n.call(e, o), i = !1
                    }
                    return e.addEventListener(t, a, !1), a
                }
            }, {}],
            3: [function(e, t, n) {
                "use strict";
                n.__esModule = !0;
                var o = (i.prototype.on = function(e, t) {
                    return this._eventCollection = this._eventCollection || {}, this._eventCollection[e] = this._eventCollection[e] || [], this._eventCollection[e].push(t), this
                }, i.prototype.once = function(e, t) {
                    var n = this;

                    function o() {
                        n.off(e, o), t.apply(this, arguments)
                    }
                    return o.listener = t, this.on(e, o), this
                }, i.prototype.off = function(e, n) {
                    var o = void 0;
                    return this._eventCollection && (o = this._eventCollection[e]) && (o.forEach(function(e, t) {
                        e !== n && e.listener !== n || o.splice(t, 1)
                    }), 0 === o.length && delete this._eventCollection[e]), this
                }, i.prototype.emit = function(e) {
                    for (var t = this, n = arguments.length, o = Array(1 < n ? n - 1 : 0), i = 1; i < n; i++) o[i - 1] = arguments[i];
                    var a = void 0;
                    return this._eventCollection && (a = this._eventCollection[e]) && (a = a.slice(0)).forEach(function(e) {
                        return e.apply(t, o)
                    }), this
                }, i);

                function i() {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, i)
                }
                n.default = o, t.exports = n.default
            }, {}]
        }, {}, [1])(1)
    }), document.getElementById("side-menu") && (slideout = new Slideout({
        panel: document.getElementById("sb-main"),
        menu: document.getElementById("side-menu"),
        side: "right"
    }), document.getElementById("menu-btn").addEventListener("click", function() {
        slideout.toggle()
    }), fixed = document.querySelector(".sb-slide"), slideout.on("translate", function(e) {
        fixed.style.transform = "translateX(" + e + "px)"
    }), slideout.on("beforeopen", function() {
        fixed.style.transition = "transform 300ms ease", fixed.style.transform = "translateX(-256px)"
    }), slideout.on("beforeclose", function() {
        fixed.style.transition = "transform 300ms ease", fixed.style.transform = "translateX(0px)"
    }), slideout.on("open", function() {
        fixed.style.transition = ""
    }), slideout.on("close", function() {
        fixed.style.transition = ""
    }));