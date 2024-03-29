winkstart.module("accounts", "accounts_manager", {
    css: ["css/accounts_manager.css"],
    templates: {
        accounts_manager: "tmpl/accounts_manager.html",
        edit: "tmpl/edit.html",
        switch_tmpl: "tmpl/switch.html",
        credits: "tmpl/credits.html"
    },
    subscribe: {
        "accounts_manager.activate": "activate",
        "accounts_manager.edit": "edit_accounts_manager",
        "accounts_manager.switch_account": "switch_account",
        "accounts_manager.trigger_masquerade": "trigger_masquerade",
        "nav.company_name_click": "restore_masquerading"
    },
    validation: [{
        name: "#vm_to_email_support_number",
        regex: /^[\+]?[0-9\s\-\x\(\)]*$/
    }, {
        name: "#vm_to_email_support_email",
        regex: _t("accounts", "vm_to_email_support_email_regex")
    }, {
        name: "#vm_to_email_send_from",
        regex: /^.*$/
    }, {
        name: "#vm_to_email_service_url",
        regex: /^.*$/
    }, {
        name: "#vm_to_email_service_provider",
        regex: /^.*$/
    }, {
        name: "#vm_to_email_service_name",
        regex: /^.*$/
    }, {
        name: "#deregister_email",
        regex: _t("accounts", "vm_to_email_support_email_regex")
    }],
    resources: {
        "accounts_manager.list_classifiers": {
            url: "{api_url}/accounts/{account_id}/phone_numbers/classifiers",
            contentType: "application/json",
            verb: "GET"
        },
        "accounts_manager.list": {
            url: "{api_url}/accounts/{account_id}/children",
            contentType: "application/json",
            verb: "GET"
        },
        "accounts_manager.get": {
            url: "{api_url}/accounts/{account_id}",
            contentType: "application/json",
            verb: "GET"
        },
        "accounts_manager.create": {
            url: "{api_url}/accounts/{account_id}",
            contentType: "application/json",
            verb: "PUT"
        },
        "accounts_manager.update": {
            url: "{api_url}/accounts/{account_id}",
            contentType: "application/json",
            verb: "POST"
        },
        "accounts_manager.delete": {
            url: "{api_url}/accounts/{account_id}",
            contentType: "application/json",
            verb: "DELETE"
        },
        "whitelabel.get": {
            url: "{api_url}/accounts/{account_id}/whitelabel",
            contentType: "application/json",
            verb: "GET"
        },
        "whitelabel.create": {
            url: "{api_url}/accounts/{account_id}/whitelabel",
            contentType: "application/json",
            verb: "PUT"
        },
        "whitelabel.update": {
            url: "{api_url}/accounts/{account_id}/whitelabel",
            contentType: "application/json",
            verb: "POST"
        },
        "whitelabel.delete": {
            url: "{api_url}/accounts/{account_id}/whitelabel",
            contentType: "application/json",
            verb: "DELETE"
        },
        "whitelabel.update_logo": {
            url: "{api_url}/accounts/{account_id}/whitelabel/logo",
            contentType: "application/x-base64",
            verb: "POST"
        },
        "accounts_manager.credits.get": {
            url: "{api_url}/accounts/{account_id}/{billing_provider}/credits",
            contentType: "application/json",
            verb: "GET"
        },
        "accounts_manager.limits.get": {
            url: "{api_url}/accounts/{account_id}/limits",
            contentType: "application/json",
            verb: "GET"
        },
        "accounts_manager.credits.update": {
            url: "{api_url}/accounts/{account_id}/{billing_provider}/credits",
            contentType: "application/json",
            verb: "PUT"
        },
        "accounts_manager.limits.update": {
            url: "{api_url}/accounts/{account_id}/limits",
            contentType: "application/json",
            verb: "POST"
        }
    }
}, function (e) {
    var t = this;
    t.module = "accounts", winkstart.publish("nav.add_sublink", {
        link: "nav",
        sublink: "switch_account",
        masqueradable: !0,
        label: _t("accounts", "switch_account"),
        weight: "05",
        publish: "accounts_manager.switch_account"
    }), winkstart.registerResources(t.__whapp, t.config.resources)
}, {
    billing_provider: "braintree",
    save_accounts_manager: function (e, t, n, r) {
        delete t.data.available_apps;
        var i = this,
            s = i.normalize_data($.extend(!0, {}, t.data, e));
        typeof t.data == "object" && t.data.id ? winkstart.request(!0, "accounts_manager.update", {
            account_id: t.data.id,
            api_url: winkstart.apps.accounts.api_url,
            data: s
        }, function (e, t) {
            typeof n == "function" && n(e, t, "update")
        }, function (e, t) {
            typeof r == "function" && r(e, t, "update")
        }) : winkstart.request(!0, "accounts_manager.create", {
            account_id: winkstart.apps.accounts.account_id,
            api_url: winkstart.apps.accounts.api_url,
            data: s
        }, function (e, t) {
            i.update_billing_account(e, function () {
                typeof n == "function" && n(e, t, "create")
            })
        }, function (e, t) {
            typeof r == "function" && r(e, t, "create")
        })
    },
    update_billing_account: function (e, t) {
        e.data.billing_id === "self" ? (e.data.billing_id = e.data.id, winkstart.request("accounts_manager.update", {
            account_id: e.data.id,
            api_url: winkstart.apps.accounts.api_url,
            data: e.data
        }, function (e, n) {
            typeof t == "function" && t()
        })) : typeof t == "function" && t()
    },
    edit_accounts_manager: function (e, t, n, r, i) {
        var s = this,
            o = t || $("#accounts_manager-content"),
            u = n || $("#accounts_manager-view", o),
            a = a || {},
            f = {
                save_success: a.save_success || function (e) {
                    s.render_list(o), s.edit_accounts_manager({
                        id: e.data.id
                    }, o, u, f)
                },
                save_error: a.save_error,
                delete_success: a.delete_success || function () {
                    u.empty(), s.render_list(o)
                },
                delete_error: a.delete_error,
                after_render: a.after_render
            },
            l = {
                data: $.extend(!0, {
                    call_restriction: {},
                    notifications: {
                        voicemail_to_email: {},
                        fax_to_email: {}
                    }
                }, i || {}),
                limits: {
                    inbound_trunks: 0,
                    twoway_trunks: 0,
                    allow_prepay: !0
                },
                credits: {
                    amount: 0
                },
                field_data: {
                    billing_account: "parent",
                    whitelabel: {
                        nav: {},
                        port: {}
                    },
                    display_limits: winkstart.apps.auth.is_reseller || (winkstart.config.hasOwnProperty("reseller_id") ? winkstart.config.reseller_id === winkstart.apps.auth.account_id : !1),
                    call_restriction: {},
                    enable_call_restriction: !1,
                    available_apps: []
                },
                functions: {
                    inArray: function (e, t) {
                        return t ? $.inArray(e, t) == -1 ? !1 : !0 : !1
                    }
                }
            };
        async.parallel({
            get_parent_account: function (t) {
                winkstart.request(!0, "accounts_manager.get", {
                    account_id: winkstart.apps.accounts.account_id,
                    api_url: winkstart.apps.accounts.api_url
                }, function (n, r) {
                    n.data.available_apps = n.data.available_apps || ((winkstart.config.onboard_roles || {})["default"] || {}).available_apps || [], (typeof e != "object" || !e.id) && $.each(n.data.available_apps, function (e, t) {
                        winkstart.config.available_apps[t] && l.field_data.available_apps.push(winkstart.config.available_apps[t])
                    }), t(null, n)
                })
            },
            get_account: function (t) {
                typeof e == "object" && e.id ? winkstart.request("accounts_manager.get", {
                    account_id: e.id,
                    api_url: winkstart.apps.accounts.api_url
                }, function (e, n) {
                    s.migrate_data(e), s.format_data(e), t(null, e)
                }) : t(null, l)
            },
            get_credits: function (t) {
                typeof e == "object" && e.id ? winkstart.request("accounts_manager.credits.get", {
                    account_id: e.id,
                    api_url: winkstart.apps.accounts.api_url,
                    billing_provider: s.billing_provider
                }, function (e, n) {
                    l.credits = e.data, t(null, e)
                }, function (e, n) {
                    t(null, {})
                }) : t(null, {})
            },
            get_limits: function (t) {
                typeof e == "object" && e.id ? winkstart.request("accounts_manager.limits.get", {
                    account_id: e.id,
                    api_url: winkstart.apps.accounts.api_url
                }, function (e, n) {
                    $.extend(!0, l.limits, e.data), t(null, e)
                }) : t(null, {})
            },
            whitelabel: function (t) {
                typeof e == "object" && e.id ? winkstart.request("whitelabel.get", {
                    account_id: e.id,
                    api_url: winkstart.apps.accounts.api_url
                }, function (n, r) {
                    l.field_data.whitelabel = $.extend(!0, l.field_data.whitelabel, n.data), l.field_data.whitelabel.logo_url = winkstart.apps.accounts.api_url + "/accounts/" + e.id + "/whitelabel/logo?auth_token=" + winkstart.apps.accounts.auth_token, t(null, n)
                }, function () {
                    t(null, {})
                }) : t(null, {})
            },
            list_classifiers: function (e) {
                winkstart.apps.auth.is_reseller || (winkstart.config.hasOwnProperty("reseller_id") ? winkstart.config.reseller_id === winkstart.apps.auth.account_id : !1) ? winkstart.request("accounts_manager.list_classifiers", {
                    api_url: winkstart.apps.accounts.api_url,
                    account_id: winkstart.apps.accounts.account_id
                }, function (t, n) {
                    "data" in t && (l.field_data.enable_call_restriction = !0, $.each(t.data, function (e, t) {
                        l.field_data.call_restriction[e] = {
                            friendly_name: t.friendly_name
                        }, l.data.call_restriction[e] = {
                            action: "inherit"
                        }
                    })), e(null, t)
                }) : e(null, {})
            }
        }, function (t, n) {
            var r = l;
            l.field_data.sameTemplate = !0, typeof e == "object" && e.id && ($.each(n.get_parent_account.data.available_apps, function (e, t) {
                var r = {},
                    i = $.inArray(t, n.get_account.data.available_apps || []);
                i > -1 ? r.enabled = !0 : r.enabled = !1, winkstart.config.available_apps[t] && $.extend(!0, r, winkstart.config.available_apps[t]), l.field_data.available_apps.push(r)
            }), r = $.extend(!0, l, n.get_account), l.field_data.sameTemplate = _.isEqual(r.data.notifications.fax_to_email, r.data.notifications.voicemail_to_email)), s.render_accounts_manager(r, u, f), typeof f.after_render == "function" && f.after_render()
        })
    },
    delete_accounts_manager: function (e, t, n) {
        var r = this;
        typeof e.data == "object" && e.data.id && winkstart.request(!0, "accounts_manager.delete", {
            account_id: e.data.id,
            api_url: winkstart.apps.accounts.api_url
        }, function (e, n) {
            typeof t == "function" && t(e, n)
        }, function (e, t) {
            typeof n == "function" && n(e, t)
        })
    },
    delete_whitelabel: function (e, t, n) {
        typeof e.data == "object" && e.data.id && winkstart.request(!0, "whitelabel.delete", {
            account_id: e.data.id,
            api_url: winkstart.apps.accounts.api_url
        }, function (e, n) {
            typeof t == "function" && t(e, n)
        }, function (e, t) {
            typeof n == "function" && n(e, t)
        })
    },
    migrate_data: function (e) {
        "vm_to_email" in e.data && (e.data.notifications = e.data.notifications || {}, e.data.notifications.voicemail_to_email = e.data.notifications.voicemail_to_email || {}, e.data.notifications.voicemail_to_email.support_number = e.data.vm_to_email.support_number, e.data.notifications.voicemail_to_email.support_email = e.data.vm_to_email.support_email, delete e.data.vm_to_email)
    },
    format_data: function (e) {
        e.field_data || (e.field_data = {}), e.data.notifications && "deregister" in e.data.notifications && e.data.notifications.deregister.send_to && e.data.notifications.deregister.send_to != "" ? e.field_data.deregister = !0 : e.field_data.deregister = !1, e.data.billing_id === winkstart.apps.accounts.account_id ? e.field_data.billing_account = "parent" : e.data.billing_id === e.data.id ? e.field_data.billing_account = "self" : e.field_data.billing_account = "other"
    },
    clean_form_data: function (e) {
        var t = [];
        return "available_apps" in e && $.each(e.available_apps, function (e, n) {
            n && t.push(n)
        }), e.available_apps = t, e.extra.deregistration_notify === !1 && (e.notifications.deregister.send_to = ""), e.extra.billing_account === "self" ? e.billing_id = "self" : e.extra.billing_account === "parent" && (e.billing_id = winkstart.apps.accounts.account_id), e.apps && (e.apps = $.map(e.apps, function (e) {
            return e ? e : null
        })), e.max_connect_failures === "" && delete e.max_connect_failures, e.whitelabel.description = e.extra.upload_media, e.whitelabel.description === "" && delete e.whitelabel.description, e.extra.sameTemplate && (e.notifications.fax_to_email = {}, $.each(e.notifications.voicemail_to_email, function (t, n) {
            e.notifications.fax_to_email[t] = n
        })), delete e.extra, e
    },
    normalize_data: function (e) {
        return $.each(e.notifications.voicemail_to_email, function (t, n) {
            n === "" && delete e.notifications.voicemail_to_email[t]
        }), $.each(e.notifications.fax_to_email, function (t, n) {
            n === "" && delete e.notifications.fax_to_email[t]
        }), $.isEmptyObject(e.vm_to_email) && delete e.vm_to_email, e.notifications.deregister && e.notifications.deregister.send_to === "" && delete e.notifications.deregister.send_to, e.billing_id === "self" && e.id && (e.billing_id = e.id), e
    },
    upload_file: function (e, t, n) {
        winkstart.request("whitelabel.update_logo", {
            account_id: t,
            api_url: winkstart.apps.accounts.api_url,
            data: e
        }, function (e, t) {
            typeof n == "function" && n()
        }, winkstart.error_message.process_error())
    },
    update_limits: function (e, t, n, r) {
        var i = this;
        winkstart.request("accounts_manager.limits.update", {
            account_id: t,
            api_url: winkstart.apps.accounts.api_url,
            data: e
        }, function (e, t) {
            typeof n == "function" && n(e, t)
        }, winkstart.error_message.process_error())
    },
    add_credits: function (e, t, n, r) {
        var i = this;
        winkstart.request("accounts_manager.credits.update", {
            account_id: t,
            api_url: winkstart.apps.accounts.api_url,
            billing_provider: i.billing_provider,
            data: {
                amount: e
            }
        }, function (e, t) {
            typeof n == "function" && n(e, t)
        }, winkstart.error_message.process_error())
    },
    render_accounts_manager: function (e, t, n) {
        e._t = function (e) {
            return window.translate.accounts[e]
        };
        var r = this,
            i = r.templates.edit.tmpl(e),
            s = $("#deregister", i),
            o = $(".deregister_email", i),
            u, a = $("#sameTemplate", i),
            f = $(".fax_to_email", i),
            l = {
                amount_balance: parseFloat(e.credits.amount),
                inbound_trunks: e.limits.inbound_trunks,
                twoway_trunks: e.limits.twoway_trunks,
                allow_prepay: e.limits.allow_prepay
            };
        winkstart.validate.set(r.config.validation, i), e.field_data.sameTemplate === !0 && $(".fax_to_email").hide(), $('*[rel=popover]:not([type="text"])', i).popover({
            trigger: "hover"
        }), $('*[rel=popover][type="text"]', i).popover({
            trigger: "focus"
        }), winkstart.tabs($(".view-buttons", i), $(".tabs", i), !0), $(".logo_div", i).css("background-image", "url(" + e.field_data.whitelabel.logo_url + "&_=" + (new Date).getTime() + ")"), e.field_data.whitelabel.description && ($("#upload_div", i).hide(), $(".player_file", i).show()), e.limits.allow_prepay === !1 && $("#credit_block", i).hide(), $("#allow_prepay", i).change(function () {
            $(this).is(":checked") !== l.allow_prepay ? $(this).addClass("updated") : $(this).removeClass("updated"), $(this).is(":checked") ? $("#credit_block", i).show() : $("#credit_block", i).hide()
        }), $(".check-value.number", i).keyup(function () {
            var e = parseFloat(l[$(this).attr("id")]),
                t = parseFloat($(this).val());
            e !== t ? $(this).addClass("updated") : $(this).removeClass("updated")
        }), $("#change_link", i).click(function (e) {
            e.preventDefault(), $("#upload_div", i).show(), $(".player_file", i).hide()
        }), $("#download_link", i).click(function (t) {
            t.preventDefault(), window.location.href = winkstart.apps.accounts.api_url + "/accounts/" + e.data.id + "/whitelabel/logo?auth_token=" + winkstart.apps.accounts.auth_token
        }), $("#file", i).bind("change", function (e) {
            var t = e.target.files;
            if (t.length > 0) {
                var n = new FileReader;
                u = "updating", n.onloadend = function (e) {
                    var t = e.target.result;
                    u = t
                }, n.readAsDataURL(t[0])
            }
        }), s.is(":checked") ? o.show() : o.hide(), s.change(function () {
            $(this).is(":checked") ? o.show("blind") : o.hide("blind")
        }), a.is(":checked") ? f.hide() : f.show(), $("#sameTemplate", i).click(function (e) {
            $(this).prop("checked") ? ($(".fax_to_email").hide(), $("#fax_to_email_support_number", i).val($("#vm_to_email_support_number", i).val()), $("#fax_to_email_support_email", i).val($("#vm_to_email_support_email", i).val()), $("#fax_to_email_send_from", i).val($("#vm_to_email_send_from", i).val()), $("#fax_to_email_service_url", i).val($("#vm_to_email_service_url", i).val()), $("#fax_to_email_service_name", i).val($("#vm_to_email_service_name", i).val()), $("#fax_to_email_service_provider", i).val($("#vm_to_email_service_provider", i).val())) : ($(".fax_to_email").show(), $(".text-val", i).val(""))
        }), $(".accounts_manager-save", i).click(function (t) {
            t.preventDefault(), winkstart.validate.is_valid(r.config.validation, i, function () {
                var t = form2object("accounts_manager-form"),
                    s = {};
                r.clean_form_data(t), "field_data" in e && delete e.field_data;
                if ("whitelabel" in t) {
                    var s = t.whitelabel;
                    delete t.whitelabel
                }
                e.data.apps = [];
                var o = function () {
                    r.save_accounts_manager(t, e, function (e, t) {
                        var o = e.data.id,
                            a = function () {
                                $("#upload_div", i).is(":visible") && $("#file", i).val() != "" ? r.upload_file(u, o, function () {
                                    typeof n.save_success == "function" && n.save_success(e, t)
                                }) : typeof n.save_success == "function" && n.save_success(e, t)
                            };
                        winkstart.request("whitelabel.get", {
                            account_id: o,
                            api_url: winkstart.apps.accounts.api_url
                        }, function (e, t) {
                            s = $.extend(!0, {}, e.data, s), winkstart.request("whitelabel.update", {
                                account_id: o,
                                api_url: winkstart.apps.accounts.api_url,
                                data: s
                            }, function (e, t) {
                                a()
                            }, winkstart.error_message.process_error())
                        }, function (t, r) {
                            r !== 404 || s.domain == "" && s.company_name == "" ? typeof n.save_success == "function" && n.save_success(e, r) : winkstart.request("whitelabel.create", {
                                account_id: o,
                                api_url: winkstart.apps.accounts.api_url,
                                data: s
                            }, function (e, t) {
                                a()
                            }, winkstart.error_message.process_error())
                        })
                    }, function () {
                        winkstart.alert(_t("config", "there_were_errors"))
                    })
                };
                if ($(".check-value", i).hasClass("updated")) {
                    if ($("#amount_balance", i).hasClass("updated")) {
                        var a = parseFloat($("#amount_balance", i).val().replace(",", ".")),
                            f = parseFloat(a - l.amount_balance);
                        f > 0 && "id" in e.data && r.add_credits(f, e.data.id, function () {})
                    }
                    if ($("#inbound_trunks", i).hasClass("updated") || $("#twoway_trunks", i).hasClass("updated") || $("#allow_prepay", i).hasClass("updated")) {
                        var c = {
                            twoway_trunks: parseInt($("#twoway_trunks", i).val()),
                            inbound_trunks: parseInt($("#inbound_trunks", i).val()),
                            allow_prepay: $("#allow_prepay", i).is(":checked")
                        };
                        c = $.extend({}, e.limits, c), c.twoway_trunks >= -1 && c.inbound_trunks >= -1 && "id" in e.data && r.update_limits(c, e.data.id, function (e) {})
                    }
                    o()
                } else o()
            })
        }), $(".accounts_manager-delete", i).click(function (t) {
            t.preventDefault(), winkstart.confirm("Are you sure you want to delete this account?<br>WARNING: This can not be undone", function () {
                r.delete_accounts_manager(e, n.delete_success, n.delete_error)
            })
        }), $(".accounts_manager-switch", i).click(function (t) {
            t.preventDefault();
            var n = {
                name: e.data.name,
                id: e.data.id
            };
            winkstart.publish("accounts_manager.trigger_masquerade", {
                account: n
            }, function () {
                winkstart.publish("accounts_manager.activate")
            })
        });
        var c = function () {
                t.empty().append(i)
            },
            h = function () {
                winkstart.publish("phone.render_account_fields", $(i), e.data.provision || (e.data.provision = {}), c) && c()
            };
        winkstart.publish("call_center.render_account_fields", $(i), e, h) && h(), $(".whitelabel-delete").click(function (t) {
            t.preventDefault(), winkstart.confirm("Are you sure you want to delete the white labeling?", function () {
                r.delete_whitelabel(e, function () {
                    r.edit_accounts_manager({
                        id: e.data.id
                    })
                }, n.delete_error)
            })
        })
    },
    render_list: function (e) {
        var t = this;
        winkstart.request("accounts_manager.list", {
            account_id: winkstart.apps.accounts.account_id,
            api_url: winkstart.apps.accounts.api_url
        }, function (n, r) {
            var i = function (e) {
                var t = [];
                return e.length > 0 && $.each(e, function (e, n) {
                    t.push({
                        id: n.id,
                        title: n.name || "(no name)"
                    })
                }), t.sort(function (e, t) {
                    return e.title.toLowerCase() < t.title.toLowerCase() ? -1 : 1
                }), t
            };
            $("#accounts_manager-listpanel", e).empty().listpanel({
                label: "Accounts",
                identifier: "accounts_manager-listview",
                new_entity_label: _t(t.module, "add_account"),
                data: i(n.data),
                publisher: winkstart.publish,
                notifyMethod: "accounts_manager.edit",
                notifyCreateMethod: "accounts_manager.edit",
                notifyParent: e
            })
        })
    },
    switch_account: function () {
        var e = this;
        winkstart.request("accounts_manager.list", {
            account_id: winkstart.apps.accounts.account_id,
            api_url: winkstart.apps.accounts.api_url
        }, function (t, n) {
            t.data.length > 0 ? (switch_html = winkstart.dialog(e.templates.switch_tmpl.tmpl({
                accounts: t.data
            }), {
                title: "Account Masquerading"
            }), $(".masquerade", switch_html).click(function () {
                var t = {
                    name: $("#sub_accounts option:selected", switch_html).text(),
                    id: $("#sub_accounts", switch_html).val()
                };
                e.trigger_masquerade({
                    account: t
                }, function () {
                    $(switch_html).dialog("close"), winkstart.publish("accounts_manager.activate")
                })
            })) : winkstart.alert("This account doesn't have any sub-accounts.")
        })
    },
    trigger_masquerade: function (e, t) {
        var n = e.account,
            r = this;
        "masquerade" in winkstart.apps.accounts || (winkstart.apps.accounts.masquerade = [], winkstart.publish("nav.company_name", function (e) {
            winkstart.apps.accounts.account_name = e
        })), winkstart.apps.accounts.masquerade.push(winkstart.apps.accounts.account_id), r.update_apps(n.id), r.masquerade_account(n.name), typeof t == "function" && t()
    },
    update_apps: function (e) {
        winkstart.apps.accounts.account_id = e, winkstart.apps.accounts.masquerade ? (winkstart.publish("accounts.start_masquerade"), $.each(winkstart.apps, function (e, t) {
            e != "accounts" && this.is_masqueradable && this.api_url === winkstart.apps.accounts.api_url ? (this.account_id = winkstart.apps.accounts.account_id, winkstart.publish("whappnav.subnav.enable", e)) : e != "accounts" && winkstart.publish("whappnav.subnav.disable", e)
        })) : (winkstart.publish("accounts.end_masquerade"), $.each(winkstart.apps, function (e, t) {
            winkstart.publish("whappnav.subnav.enable", e), this.is_masqueradable && this.api_url === winkstart.apps.accounts.api_url && (this.account_id = winkstart.apps.accounts.account_id)
        }))
    },
    restore_masquerading: function () {
        var e = this,
            t = winkstart.apps.accounts.masquerade.pop();
        winkstart.apps.accounts.masquerade.length ? winkstart.request("accounts_manager.get", {
            api_url: winkstart.apps.accounts.api_url,
            account_id: t
        }, function (t, n) {
            e.update_apps(t.data.id), e.masquerade_account(t.data.name), winkstart.publish("accounts_manager.activate")
        }) : (delete winkstart.apps.accounts.masquerade, e.update_apps(t), winkstart.publish("nav.company_name", function () {
            return winkstart.apps.accounts.account_name
        }), winkstart.publish("accounts_manager.activate"))
    },
    masquerade_account: function (e) {
        var t = this;
        winkstart.publish("nav.company_name", function () {
            return "as " + e + " (restore)"
        })
    },
    activate: function (e) {
        var t = this,
            n = t.templates.accounts_manager.tmpl();
        (e || $("#ws-content")).empty().append(n), t.render_list(n)
    }
});
