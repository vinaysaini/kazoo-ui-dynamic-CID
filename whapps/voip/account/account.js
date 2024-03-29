winkstart.module("voip", "account", {
    css: [],
    templates: {
        account: "tmpl/account.html",
        edit: "tmpl/edit.html"
    },
    subscribe: {
        "account.activate": "activate",
        "account.edit": "edit_account"
    },
    validation: [{
        name: "#caller_id_name_external",
        regex: _t("account", "caller_id_name_regex")
    }, {
        name: "#caller_id_number_external",
        regex: /^[\+]?[0-9\s\-\.\(\)]*$/
    }, {
        name: "#caller_id_name_internal",
        regex: _t("account", "caller_id_name_regex")
    }, {
        name: "#caller_id_number_internal",
        regex: /^[\+]?[0-9\s\-\.\(\)]*$/
    }, {
        name: "#caller_id_name_emergency",
        regex: _t("account", "caller_id_name_regex")
    }, {
        name: "#caller_id_number_emergency",
        regex: /^[\+]?[0-9\s\-\.\(\)]*$/
    }, {
        name: "#contact_billing_email",
        regex: _t("account", "contact_regex")
    }, {
        name: "#contact_billing_number",
        regex: /^[\+]?[0-9\s\-\.\(\)]*$/
    }, {
        name: "#contact_technical_email",
        regex: _t("account", "contact_regex")
    }, {
        name: "#contact_technical_number",
        regex: /^[\+]?[0-9\s\-\.\(\)]*$/
    }],
    resources: {
        "account.get": {
            url: "{api_url}/accounts/{account_id}",
            contentType: "application/json",
            verb: "GET"
        },
        "account.update": {
            url: "{api_url}/accounts/{account_id}",
            contentType: "application/json",
            verb: "POST"
        },
        "account.list_descendants": {
            url: "{api_url}/accounts/{account_id}/descendants",
            contentType: "application/json",
            verb: "GET"
        },
        "account.list": {
            url: "{api_url}/accounts/{account_id}/children",
            contentType: "application/json",
            verb: "GET"
        }
    }
}, function (e) {
    var t = this;
    t.module = "account", winkstart.registerResources(t.__whapp, t.config.resources), winkstart.publish("whappnav.subnav.add", {
        whapp: "voip",
        module: t.__module,
        label: _t("account", "account_details_label"),
        icon: "account",
        weight: "0"
    })
}, {
    save_account: function (e, t, n, r) {
        var i = this,
            s = i.normalize_data($.extend(!0, {}, t.data, e));
        typeof t.data == "object" && t.data.id && winkstart.request(!0, "account.update", {
            account_id: t.data.id,
            api_url: winkstart.apps.voip.api_url,
            data: s
        }, function (e, t) {
            typeof n == "function" && n(e, t, "update")
        }, function (e, t) {
            typeof r == "function" && r(e, t, "update")
        })
    },
    edit_account: function (e, t, n, r, i) {
        var s = this,
            o = t || $("#account-content"),
            u = n || $("#account-view", o),
            a = a || {},
            f = {
                save_success: a.save_success || function (e) {
                    s.edit_account({
                        id: e.data.id
                    }, o, u, f)
                },
                save_error: a.save_error,
                delete_success: a.delete_success || function () {
                    u.empty()
                },
                delete_error: a.delete_error,
                after_render: a.after_render
            },
            l = {
                data: $.extend(!0, {
                    caller_id: {
                        internal: {},
                        external: {},
                        emergency: {}
                    },
                    contact: {
                        technical: {},
                        billing: {}
                    },
                    music_on_hold: {}
                }, i || {}),
                field_data: {}
            };
        winkstart.parallel({
            media_list: function (e) {
                winkstart.request(!0, "media.list", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url
                }, function (t, n) {
                    t.data.unshift({
                        id: "",
                        name: _t("account", "default_music")
                    }, {
                        id: "silence_stream://300000",
                        name: _t("account", "silence")
                    }), l.field_data.media = t.data, e(null, t)
                })
            },
            get_account: function (t) {
                typeof e == "object" && e.id ? winkstart.request(!0, "account.get", {
                    account_id: e.id,
                    api_url: winkstart.apps.voip.api_url
                }, function (e, n) {
                    s.migrate_data(e), s.format_data(e), t(null, e)
                }) : t(null, l)
            }
        }, function (t, n) {
            var r = l;
            typeof e == "object" && e.id && (r = $.extend(!0, l, n.get_account)), s.render_account(l, u, f), typeof f.after_render == "function" && f.after_render()
        })
    },
    delete_account: function (e, t, n) {
        var r = this;
        typeof e.data == "object" && e.data.id && winkstart.request(!0, "account.delete", {
            account_id: e.data.id,
            api_url: winkstart.apps.voip.api_url
        }, function (e, n) {
            typeof t == "function" && t(e, n)
        }, function (e, t) {
            typeof n == "function" && n(e, t)
        })
    },
    migrate_data: function (e) {},
    format_data: function (e) {
        e.field_data || (e.field_data = {}), e.data.music_on_hold && "media_id" in e.data.music_on_hold && e.data.music_on_hold.media_id !== "silence_stream://300000" && (e.data.music_on_hold.media_id = e.data.music_on_hold.media_id.split("/")[2])
    },
    clean_form_data: function (e) {
        return e.caller_id.internal.number = e.caller_id.internal.number.replace(/\s|\(|\)|\-|\./g, ""), e.caller_id.emergency.number = e.caller_id.emergency.number.replace(/\s|\(|\)|\-|\./g, ""), e.caller_id.external.number = e.caller_id.external.number.replace(/\s|\(|\)|\-|\./g, ""), e.music_on_hold && e.music_on_hold.media_id && e.music_on_hold.media_id !== "silence_stream://300000" && (e.music_on_hold.media_id = "/" + winkstart.apps.voip.account_id + "/" + e.music_on_hold.media_id), delete e.extra, e
    },
    normalize_data: function (e) {
        return $.each(e.caller_id, function (t, n) {
            $.each(n, function (e, t) {
                t == "" && delete n[e]
            }), $.isEmptyObject(n) && delete e.caller_id[t]
        }), $.isEmptyObject(e.caller_id) && delete e.caller_id, e.music_on_hold.media_id || delete e.music_on_hold.media_id, e
    },
    render_account: function (e, t, n) {
        e._t = function (e) {
            return window.translate.account[e]
        };
        var r = this,
            i = r.templates.edit.tmpl(e),
            s = $("#contact_technical_email", i),
            o = $("#contact_technical_number", i),
            u = $("#contact_billing_email", i),
            a = $("#contact_billing_number", i),
            f = !1;
        winkstart.validate.set(r.config.validation, i), $('*[rel=popover]:not([type="text"])', i).popover({
            trigger: "hover"
        }), $('*[rel=popover][type="text"]', i).popover({
            trigger: "focus"
        }), winkstart.tabs($(".view-buttons", i), $(".tabs", i)), $(".account-save", i).click(function (t) {
            t.preventDefault(), winkstart.validate.is_valid(r.config.validation, i, function () {
                var t = form2object("account-form");
                r.clean_form_data(t), "field_data" in e && delete e.field_data, r.save_account(t, e, n.save_success, winkstart.error_message.process_error(n.save_error))
            }, function () {
                winkstart.alert(_t("account", "there_were_errors_on_the_form"))
            })
        }), $(".account-delete", i).click(function (t) {
            t.preventDefault(), winkstart.confirm(_t("account", "are_you_sure_you_want_to_delete"), function () {
                r.delete_account(e, n.delete_success, n.delete_error)
            })
        }), $("#contact_copy_checkbox", i).change(function () {
            $("#contact_copy_checkbox", i).attr("checked") ? (s.val(u.val()), o.val(a.val()), $(".contact-technical", i).slideUp(), f = !0) : ($(".contact-technical", i).slideDown(), f = !1)
        }), u.keyup(function () {
            f && s.val(u.val())
        }), a.keyup(function () {
            f && o.val(a.val())
        }), (s.val().length > 0 || o.val().length > 0) && o.val() == a.val() && s.val() == u.val() && ($("#contact_copy_checkbox", i).attr("checked", "checked"), $(".contact-technical", i).hide(), f = !0), $("#music_on_hold_media_id", i).val() || $("#edit_link_media", i).hide(), $("#music_on_hold_media_id", i).change(function () {
            $("#music_on_hold_media_id option:selected", i).val() ? $("#edit_link_media", i).show() : $("#edit_link_media", i).hide()
        }), $(".inline_action_media", i).click(function (e) {
            var t = $(this).dataset("action") == "edit" ? {
                    id: $("#music_on_hold_media_id", i).val()
                } : {},
                n = t.id;
            e.preventDefault(), winkstart.publish("media.popup_edit", t, function (e) {
                n ? "id" in e.data ? $("#music_on_hold_media_id #" + e.data.id, i).text(e.data.name) : ($("#music_on_hold_media_id #" + n, i).remove(), $("#edit_link_media", i).hide()) : ($("#music_on_hold_media_id", i).append('<option id="' + e.data.id + '" value="' + e.data.id + '">' + e.data.name + "</option>"), $("#music_on_hold_media_id", i).val(e.data.id), $("#edit_link_media", i).show())
            })
        });
        var l = function () {
            t.empty().append(i)
        };
        winkstart.publish("call_center.render_account_fields", $(i), e, l) && l()
    },
    activate: function (e) {
        var t = this,
            n = t.templates.account.tmpl();
        (e || $("#ws-content")).empty().append(n), t.edit_account({
            id: winkstart.apps.voip.account_id
        })
    }
});
