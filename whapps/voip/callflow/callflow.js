winkstart.module("voip", "callflow", {
    css: ["css/style.css", "css/two_columns.css", _t("callflow", "css_callflow"), "css/ring_groups.css"],
    templates: {
        callflow: "tmpl/callflow.html",
        callflow_main: "tmpl/callflow_main.html",
        branch: "tmpl/branch.html",
        tools: "tmpl/tools.html",
        root: "tmpl/root.html",
        node: "tmpl/node.html",
        num_row: "tmpl/num_row.html",
        add_number: "tmpl/add_number.html",
        edit_dialog: "tmpl/edit_dialog.html",
        two_column: "tmpl/two_column.html",
        call_record_callflow: "tmpl/call_record_callflow.html",
        disa_callflow: "tmpl/disa_callflow.html",
        pivot_callflow: "tmpl/pivot_callflow.html",
        presence_callflow: "tmpl/presence_callflow.html",
        page_group_dialog: "tmpl/page_group_dialog.html",
        page_group_element: "tmpl/page_group_element.html",
        ring_group_dialog: "tmpl/ring_group_dialog.html",
        ring_group_element: "tmpl/ring_group_element.html",
        buttons: "tmpl/buttons.html",
        help_callflow: "tmpl/help_callflow.html",
        fax_callflow: "tmpl/fax_callflow.html",
        edit_name: "tmpl/edit_name.html",
        prepend_cid_callflow: "tmpl/prepend_cid_callflow.html",
	automatic_cid_callflow: "tmpl/automatic_cid_callflow.html",
        response_callflow: "tmpl/response_callflow.html",
        group_pickup: "tmpl/group_pickup.html"
    },
    elements: {
        flow: "#ws_cf_flow",
        tools: "#ws_cf_tools",
        save: "#ws_cf_save",
        buf: "#ws_cf_buf"
    },
    subscribe: {
        "callflow.activate": "activate",
        "callflow.list-panel-click": "editCallflow",
        "callflow.edit-callflow": "editCallflow",
        "callflow.define_callflow_nodes": "define_callflow_nodes"
    },
    resources: {
        "callflow.list_numbers": {
            url: "{api_url}/accounts/{account_id}/phone_numbers",
            contentType: "application/json",
            verb: "GET"
        },
        "callflow.list": {
            url: "{api_url}/accounts/{account_id}/callflows",
            contentType: "application/json",
            verb: "GET"
        },
        "callflow.list_no_loading": {
            url: "{api_url}/accounts/{account_id}/callflows",
            contentType: "application/json",
            verb: "GET",
            trigger_events: !1
        },
        "callflow.get": {
            url: "{api_url}/accounts/{account_id}/callflows/{callflow_id}",
            contentType: "application/json",
            verb: "GET"
        },
        "callflow.get_no_match": {
            url: "{api_url}/accounts/{account_id}/callflows?filter_numbers=no_match",
            contentType: "application/json",
            verb: "GET"
        },
        "callflow.create": {
            url: "{api_url}/accounts/{account_id}/callflows",
            contentType: "application/json",
            verb: "PUT"
        },
        "callflow.create_no_loading": {
            url: "{api_url}/accounts/{account_id}/callflows",
            contentType: "application/json",
            verb: "PUT",
            trigger_events: !1
        },
        "callflow.update": {
            url: "{api_url}/accounts/{account_id}/callflows/{callflow_id}",
            contentType: "application/json",
            verb: "POST"
        },
        "callflow.update_no_loading": {
            url: "{api_url}/accounts/{account_id}/callflows/{callflow_id}",
            contentType: "application/json",
            verb: "POST",
            trigger_events: !1
        },
        "callflow.delete": {
            url: "{api_url}/accounts/{account_id}/callflows/{callflow_id}",
            contentType: "application/json",
            verb: "DELETE"
        },
        "callflow.list_trunkstore_accounts": {
            url: "{api_url}/accounts/{account_id}/connectivity/",
            contentType: "application/json",
            verb: "GET"
        },
        "callflow.get_trunkstore_account": {
            url: "{api_url}/accounts/{account_id}/connectivity/{connectivity_id}",
            contentType: "application/json",
            verb: "GET"
        },
        "callflow.list_media": {
            url: "{api_url}/accounts/{account_id}/media",
            contentType: "application/json",
            verb: "GET"
        },
        "callflow.list_devices": {
            url: "{api_url}/accounts/{account_id}/devices",
            contentType: "application/json",
            verb: "GET"
        },
        "callflow.list_users": {
            url: "{api_url}/accounts/{account_id}/users",
            contentType: "application/json",
            verb: "GET"
        },
        "callflow.list_groups": {
            url: "{api_url}/accounts/{account_id}/groups",
            contentType: "application/json",
            verb: "GET"
        }
    }
}, function (e) {
    var t = this;
    winkstart.registerResources(t.__whapp, t.config.resources), winkstart.publish("whappnav.subnav.add", {
        whapp: "voip",
        module: t.__module,
        label: _t("callflow", "callflows_label"),
        icon: "callflow",
        weight: "50"
    })
}, {
    actions: {},
    list_accounts: function (e, t) {
        winkstart.request("callflow.list_trunkstore_accounts", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url
        }, function (t, n) {
            typeof e == "function" && e(t, n)
        }, function (e, n) {
            typeof t == "function" && t(e, n)
        })
    },
    get_account: function (e, t) {
        var n = this;
        winkstart.request("callflow.get_trunkstore_account", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            connectivity_id: winkstart.apps.voip.connectivity_id
        }, function (t, n) {
            typeof e == "function" && e(t, n)
        }, function (e, n) {
            typeof t == "function" && t(e, n)
        })
    },
    list_numbers_callflow: function (e, t) {
        var n = this;
        winkstart.request("callflow.list", {
            api_url: winkstart.apps.voip.api_url,
            account_id: winkstart.apps.voip.account_id
        }, function (t, n) {
            var r = {};
            $.each(t.data, function (e, t) {
                t.numbers && $.each(t.numbers, function (e, t) {
                    r[t] = !0
                })
            }), typeof e == "function" && e(r)
        }, function (e, n) {
            typeof t == "function" && t(e)
        })
    },
    list_numbers_trunkstore: function (e, t) {
        var n = this;
        n.list_accounts(function (r, i) {
            var s = {};
            r.data.length ? (winkstart.apps.voip.connectivity_id = r.data[0], n.get_account(function (t, n) {
                typeof e == "function" && ($.each(t.data.servers, function (e, t) {
                    $.each(this.DIDs, function (e, t) {
                        s[e] = !0
                    })
                }), e(s, n))
            }, function (e, n) {
                typeof t == "function" && t(r, n)
            })) : e(s, i)
        }, function (e, n) {
            typeof t == "function" && t(e, n)
        })
    },
    activate: function () {
        var e = this,
            t = e.templates.callflow_main.tmpl();
        $("#ws-content").empty().append(t), e.config.elements._t = function (e) {
            return window.translate.callflow[e]
        }, e.renderList(function () {
            e.templates.callflow.tmpl(e.config.elements).appendTo($("#callflow-view"))
        }), winkstart.publish("callflow.define_callflow_nodes", e.actions)
    },
    list_numbers: function (e, t) {
        var n = this;
        winkstart.request("callflow.list_numbers", {
            api_url: winkstart.apps.voip.api_url,
            account_id: winkstart.apps.voip.account_id
        }, function (r, i) {
            n.list_numbers_callflow(function (t, i) {
                "numbers" in r.data && $.each(t, function (e, t) {
                    delete r.data.numbers[e]
                }), typeof e == "function" && n.list_numbers_trunkstore(function (t) {
                    "numbers" in r.data && $.each(t, function (e, t) {
                        delete r.data.numbers[e]
                    }), e(r)
                }, function (t) {
                    e(r)
                })
            }, function (e, n) {
                typeof t == "function" && t(e)
            })
        }, function (e, n) {
            typeof t == "function" && t(e)
        })
    },
    renderButtons: function () {
        data = {
            _t: function (e) {
                return window.translate.callflow[e]
            }
        };
        var e = this,
            t = e.templates.buttons.tmpl(data);
        $(".buttons").empty(), $(".save", t).click(function () {
            e.flow.numbers && e.flow.numbers.length > 0 ? e.save() : winkstart.alert(_t("callflow", "invalid_number") + "<br/><br/>" + _t("callflow", "please_select_valid_number"))
        }), $(".delete", t).click(function () {
            e.flow.id ? winkstart.confirm(_t("callflow", "are_you_sure"), function () {
                winkstart.deleteJSON("callflow.delete", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url,
                    callflow_id: e.flow.id
                }, function () {
                    $("#ws_cf_flow").empty(), $(".buttons").empty(), $("#ws_cf_tools").empty(), e.renderList(), e._resetFlow()
                }), e.show_pending_change(!1)
            }) : winkstart.alert(_t("callflow", "this_callflow_has_not_been_created"))
        }), $(".buttons").append(t)
    },
    editCallflow: function (e) {
        var t = this;
        delete t.original_flow, $("#callflow-view .callflow_help").remove(), t._resetFlow(), e && e.id ? winkstart.getJSON("callflow.get", {
            crossbar: !0,
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url,
            callflow_id: e.id
        }, function (e) {
            t._resetFlow(), t.flow.id = e.data.id, t.flow.name = e.data.name, t.flow.contact_list = {
                exclude: "contact_list" in e.data ? e.data.contact_list.exclude || !1 : !1
            }, t.flow.caption_map = e.data.metadata, e.data.flow.module != undefined && (t.flow.root = t.buildFlow(e.data.flow, t.flow.root, 0, "_")), t.flow.numbers = e.data.numbers || [], t.renderFlow()
        }) : (t._resetFlow(), t.renderFlow()), t.renderTools(), t.renderButtons()
    },
    buildFlow: function (e, t, n, r) {
        var i = this,
            s = i.branch(i.construct_action(e));
        return s.data.data = "data" in e ? e.data : {}, s.id = ++n, s.key = r, s.caption = i.actions[s.actionName].caption(s, i.flow.caption_map), "key_caption" in i.actions[t.actionName] && (s.key_caption = i.actions[t.actionName].key_caption(s, i.flow.caption_map)), $.each(e.children, function (e, t) {
            s = i.buildFlow(t, s, n, e)
        }), t.addChild(s), t
    },
    construct_action: function (e) {
        var t = "";
        return "data" in e && ("id" in e.data && (t = "id=*,"), "action" in e.data && (t += "action=" + e.data.action + ",")), t != "" ? t = "[" + t.replace(/,$/, "]") : t = "[]", e.module + t
    },
    renderFlow: function () {
        var e = this;
        e.flow.savable = !0;
        var t = $(this.config.elements.flow).empty();
        t.append(this._renderFlow());
        var n = e.stringify_flow(e.flow);
        "original_flow" in e && e.original_flow.split("|")[0] === n.split("|")[0] ? e.show_pending_change(e.original_flow !== n) : (e.original_flow = n, e.show_pending_change(!1))
    },
    show_pending_change: function (e) {
        var t = this;
        e ? ($("#pending_change", "#ws_callflow").show(), $(".save", "#ws_callflow").addClass("pulse-box")) : ($("#pending_change", "#ws_callflow").hide(), $(".save", "#ws_callflow").removeClass("pulse-box"))
    },
    stringify_flow: function (e) {
        var t = e.id + "|" + (e.name ? e.name : "undefined"),
            n;
        return t += "|NUMBERS", $.each(e.numbers, function (e, n) {
            t += "|" + n
        }), t += "|NODES", $.each(e.nodes, function (e, r) {
            t += "|" + e + "::", n = !0, $.each(r.data.data, function (e, r) {
                n ? n = !1 : t += "//", t += e + ":" + r
            })
        }), t
    },
    branch: function (e) {
        function n(e) {
            var n = this;
            this.id = -1, this.actionName = e, this.module = t.actions[this.actionName].module, this.key = "_", this.parent = null, this.children = [], this.data = {
                data: $.extend(!0, {}, t.actions[this.actionName].data)
            }, this.caption = "", this.key_caption = "", this.potentialChildren = function () {
                var e = [];
                for (var n in t.actions) t.actions[n].isUsable && (e[n] = n);
                for (var n in t.actions[this.actionName].rules) {
                    var r = t.actions[this.actionName].rules[n];
                    switch (r.type) {
                    case "quantity":
                        this.children.length >= r.maxSize && (e = [])
                    }
                }
                return e
            }, this.contains = function (e) {
                var t = e;
                while (t.parent) {
                    if (this.id == t.id) return !0;
                    t = t.parent
                }
                return !1
            }, this.removeChild = function (e) {
                $.each(this.children, function (t, r) {
                    if (r.id == e.id) return n.children.splice(t, 1), !1
                })
            }, this.addChild = function (e) {
                return e.actionName in this.potentialChildren() ? e.contains(this) ? !1 : (e.parent && e.parent.removeChild(e), e.parent = this, this.children.push(e), !0) : !1
            }, this.getMetadata = function (e) {
                var t;
                return "data" in this.data && e in this.data.data ? (t = this.data.data[e], t == "null" ? null : t) : !1
            }, this.setMetadata = function (e, t) {
                "data" in this.data || (this.data.data = {}), this.data.data[e] = t == null ? "null" : t
            }, this.deleteMetadata = function (e) {
                "data" in this.data && e in this.data.data && delete this.data.data[e]
            }, this.index = function (e) {
                return this.id = e, $.each(this.children, function () {
                    e = this.index(e + 1)
                }), e
            }, this.nodes = function () {
                var e = {};
                return e[this.id] = this, $.each(this.children, function () {
                    var t = this.nodes();
                    $.each(t, function () {
                        e[this.id] = this
                    })
                }), e
            }, this.serialize = function () {
                var e = $.extend(!0, {}, this.data);
                return e.module = this.module, e.children = {}, $.each(this.children, function () {
                    e.children[this.key] = this.serialize()
                }), e
            }
        }
        var t = this;
        return new n(e)
    },
    _count: function (e) {
        var t = 0;
        return $.each(e, function () {
            t++
        }), t
    },
    categories: {},
    flow: {},
    _resetFlow: function () {
        var e = this;
        e.flow = {}, e.flow.root = e.branch("root"), e.flow.root.key = "flow", e.flow.numbers = [], e.flow.caption_map = {}, e._formatFlow()
    },
    _formatFlow: function () {
        var e = this;
        e.flow.root.index(0), e.flow.nodes = e.flow.root.nodes()
    },
    _renderFlow: function () {
        var e = this;
        e._formatFlow();
        var t = e._renderBranch(e.flow.root);
        return $(".node", t).hover(function () {
            $(this).addClass("over")
        }, function () {
            $(this).removeClass("over")
        }), $(".node", t).each(function () {
            var n = e.flow.nodes[$(this).attr("id")],
                r = $(this),
                i;
            if (n.actionName == "root") {
                r.removeClass("icons_black root"), i = e.templates.root.tmpl({
                    name: e.flow.name || "Callflow"
                }), $(".edit_icon", i).click(function () {
                    e.flow = $.extend(!0, {
                        contact_list: {
                            exclude: !1
                        }
                    }, e.flow);
                    var n = winkstart.dialog(e.templates.edit_name.tmpl({
                        name: e.flow.name,
                        exclude: e.flow.contact_list.exclude,
                        _t: function (e) {
                            return window.translate.callflow[e]
                        }
                    }), {
                        width: "310px",
                        title: _t("callflow", "popup_title")
                    });
                    $("#add", n).click(function () {
                        var r = $("#callflow_name", n);
                        r.val() != "" ? (e.flow.name = r.val(), $(".root .top_bar .name", t).html(e.flow.name)) : (e.flow.name = "", $(".root .top_bar .name", t).html("Callflow")), e.flow.contact_list = {
                            exclude: $("#callflow_exclude", n).prop("checked")
                        }, e.renderFlow(), n.dialog("close")
                    })
                }), $(".tooltip", i).click(function () {
                    winkstart.dialog(e.templates.help_callflow.tmpl())
                });
                for (var s, o = e.flow.numbers.length, u = Math.floor(o / 2) + 1, a = 0; a < u; a++) s = a * 2, e.templates.num_row.tmpl({
                    numbers: e.flow.numbers.slice(s, s + 2 < o ? s + 2 : o),
                    _t: function (e) {
                        return window.translate.callflow[e]
                    }
                }).appendTo($(".content", i));
                $(".number_column.empty", i).click(function () {
                    e.list_numbers(function (t) {
                        var n = [];
                        "numbers" in t.data && $.each(t.data.numbers, function (e, t) {
                            n.push(e)
                        }), n.sort();
                        var r = e.templates.add_number.tmpl({
                                phone_numbers: n,
                                _t: function (e) {
                                    return window.translate.callflow[e]
                                }
                            }),
                            i;
                        n.length === 0 && ($("#list_numbers", r).attr("disabled", "disabled"), $('<option value="select_none">' + _t("callflow", "no_phone_numbers") + "</option>").appendTo($("#list_numbers", r)));
                        var s = function () {
                                i = winkstart.dialog(r, {
                                    title: _t("callflow", "add_number")
                                })
                            },
                            o = function () {
                                e.list_numbers(function (e) {
                                    n = [], "numbers" in e.data && $.each(e.data.numbers, function (e, t) {
                                        n.push(e)
                                    }), n.sort(), $("#list_numbers", i).empty(), n.length === 0 ? ($("#list_numbers", i).attr("disabled", "disabled"), $('<option value="select_none">' + _t("callflow", "no_phone_numbers") + "</option>").appendTo($("#list_numbers", i))) : ($("#list_numbers", i).removeAttr("disabled"), $.each(n, function (e, t) {
                                        $('<option value="' + t + '">' + t + "</option>").appendTo($("#list_numbers", i))
                                    }))
                                })
                            };
                        winkstart.publish("numbers_manager.render_fields", $("#number_manager_fields", r), s, o) && s(), $(".extensions_content", i).hide(), $('input[name="number_type"]', i).click(function () {
                            $(this).val() === "your_numbers" ? ($(".list_numbers_content", i).show(), $(".extensions_content", i).hide()) : ($(".extensions_content", i).show(), $(".list_numbers_content", i).hide())
                        }), $("button.add_number", i).click(function (t) {
                            t.preventDefault();
                            var n = $('input[name="number_type"]:checked', i).val() === "your_numbers" ? $("#list_numbers option:selected", i).val() : $("#add_number_text", i).val(),
                                r = {},
                                s = function () {
                                    n !== "select_none" && n !== "" ? (e.flow.numbers.push(n), i.dialog("close"), e.renderFlow()) : winkstart.alert(_t("callflow", "you_didnt_select"))
                                },
                                o = function () {
                                    e.list_numbers_callflow(function (e, t) {
                                        r = $.extend(!0, r, e), n in r ? winkstart.alert(_t("callflow", "this_number_is_already_attached")) : s()
                                    }, function (e, t) {
                                        s()
                                    })
                                };
                            e.list_numbers_trunkstore(function (e) {
                                r = e, o()
                            }, function (e) {
                                o()
                            })
                        })
                    })
                }), $(".number_column .delete", i).click(function () {
                    var t = $(this).parent(".number_column").dataset("number"),
                        n = $.inArray(t, e.flow.numbers);
                    n >= 0 && e.flow.numbers.splice(n, 1), e.renderFlow()
                })
            } else i = e.templates.node.tmpl({
                node: n,
                callflow: e.actions[n.actionName]
            }), $(".module", i).click(function () {
                e.actions[n.actionName].edit(n, function () {
                    e.renderFlow()
                })
            });
            $(this).append(i), $(this).droppable({
                drop: function (t, n) {
                    var r = e.flow.nodes[$(this).attr("id")],
                        i;
                    n.draggable.hasClass("action") && (i = n.draggable.attr("name"), s = e.branch(i), s.caption = e.actions[i].caption(s, e.flow.caption_map), r.addChild(s) && (s.parent && "key_caption" in e.actions[s.parent.actionName] ? (s.key_caption = e.actions[s.parent.actionName].key_caption(s, e.flow.caption_map), e.actions[s.parent.actionName].key_edit(s, function () {
                        e.actions[i].edit(s, function () {
                            e.renderFlow()
                        })
                    })) : e.actions[i].edit(s, function () {
                        e.renderFlow()
                    }), e.renderFlow()));
                    if (n.draggable.hasClass("node")) {
                        var s = e.flow.nodes[n.draggable.attr("id")];
                        r.addChild(s) && (s.key = "_", s.parent && "key_caption" in e.actions[s.parent.actionName] && (s.key_caption = e.actions[s.parent.actionName].key_caption(s, e.flow.caption_map)), n.draggable.remove(), e.renderFlow())
                    }
                }
            }), $(this).attr("name") != "root" && $(this).draggable({
                start: function () {
                    var t = $(this).next(),
                        n = t.offset().top - $(this).offset().top,
                        r = t.offset().left - $(this).offset().left;
                    e._enableDestinations($(this)), $(this).attr("t", n), $(this).attr("l", r)
                },
                drag: function () {
                    var e = $(this).next(),
                        t = $(this).offset().top + parseInt($(this).attr("t")),
                        n = $(this).offset().left + parseInt($(this).attr("l"));
                    e.offset({
                        top: t,
                        left: n
                    })
                },
                stop: function () {
                    e._disableDestinations(), e.renderFlow()
                }
            })
        }), $(".node-options .delete", t).click(function () {
            var t = e.flow.nodes[$(this).attr("id")];
            t.parent && (t.parent.removeChild(t), e.renderFlow())
        }), t
    },
    _renderBranch: function (e) {
        var t = this,
            n = t.templates.branch.tmpl({
                node: e,
                display_key: e.parent && "key_caption" in t.actions[e.parent.actionName]
            }),
            r;
        return e.parent && "key_edit" in t.actions[e.parent.actionName] && $(".div_option", n).click(function () {
            t.actions[e.parent.actionName].key_edit(e, function () {
                t.renderFlow()
            })
        }), r = $(".children", n), $.each(e.children, function () {
            r.append(t._renderBranch(this))
        }), n
    },
    renderTools: function () {
        function s(t) {
            t.draggable({
                start: function () {
                    var t = $(this).clone();
                    e._enableDestinations($(this)), s(t), t.addClass("inactive"), t.insertBefore($(this)), $(this).addClass("active")
                },
                drag: function () {
                    $(".callflow_helpbox_wrapper", "#callflow-view").hide()
                },
                stop: function () {
                    e._disableDestinations(), $(this).prev().removeClass("inactive"), $(this).remove()
                }
            })
        }
        var e = this,
            t = $(e.config.elements.buf),
            n, r;
        e.categories = {}, e.categories["'" + _t("callflow", "basic") + "'"] = [], e.categories["'" + _t("callflow", "advanced") + "'"] = [], $.each(e.actions, function (t, n) {
            "category" in n && (n.category in e.categories ? !0 : e.categories[n.category] = [], e.categories[n.category].push(t))
        }), r = e.templates.tools.tmpl({
            categories: e.categories,
            nodes: e.actions,
            _t: function (e) {
                return window.translate.callflow[e]
            }
        }), $(".content", r).hide(), $(".tooltip", r).click(function () {
            winkstart.dialog(e.templates.help_callflow.tmpl())
        }), $("#basic", r).removeClass("inactive").addClass("active"), $("#basic .content", r).show(), $(".category .open", r).click(function () {
            var e = $(this);
            $(".category .content", r).hide(), $(".category", r).removeClass("active").addClass("inactive"), $(this).parent(".category").removeClass("inactive").addClass("active"), $(this).siblings(".content").show()
        });
        var i = $(".callflow_helpbox_wrapper", "#callflow-view").first();
        $(".tool", r).hover(function () {
            $(this).addClass("active"), $(".tool_name", "#callflow-view").removeClass("active"), $(".tool_name", $(this)).addClass("active"), $(this).attr("help") && ($("#help_box", i).html($(this).attr("help")), $(".callflow_helpbox_wrapper", "#callflow-view").css("top", $(this).offset().top - 72).show())
        }, function () {
            $(this).removeClass("active"), $(".callflow_helpbox_wrapper", "#callflow-view").hide()
        }), $(".action", r).each(function () {
            s($(this))
        }), n = $(e.config.elements.tools).empty(), n.append(r), $("#ws_cf_tools", "#callflow-view").disableSelection()
    },
    _enableDestinations: function (e) {
        var t = this;
        $(".node").each(function () {
            var n = !0,
                r = t.flow.nodes[$(this).attr("id")];
            e.attr("name") in r.potentialChildren() ? e.hasClass("node") && t.flow.nodes[e.attr("id")].contains(r) && (n = !1) : n = !1, n ? $(this).addClass("active") : ($(this).addClass("inactive"), $(this).droppable("disable"))
        })
    },
    _disableDestinations: function () {
        $(".node").each(function () {
            $(this).removeClass("active"), $(this).removeClass("inactive"), $(this).droppable("enable")
        }), $(".tool").removeClass("active")
    },
    save_callflow_no_loading: function () {
        var e = this;
        if (e.flow && e.flow.numbers && e.flow.numbers.length > 0 && e.flow.nodes && e.flow.nodes[0] && e.flow.nodes[0].children && e.flow.nodes[0].children[0] && e.flow.nodes[0].children[0].module != "")
            if (e.flow.id) {
                var t = {
                    numbers: e.flow.numbers,
                    flow: e.flow.root.children[0] == undefined ? {} : e.flow.root.children[0].serialize()
                };
                e.flow.name != "" && (t.name = e.flow.name), winkstart.postJSON("callflow.update_no_loading", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url,
                    callflow_id: e.flow.id,
                    data: t
                }, function (t) {
                    e.renderList(null, !0)
                }, winkstart.error_message.process_error())
            } else winkstart.putJSON("callflow.create_no_loading", {
                account_id: winkstart.apps.voip.account_id,
                api_url: winkstart.apps.voip.api_url,
                data: {
                    numbers: e.flow.numbers,
                    flow: e.flow.root.children[0] == undefined ? {} : e.flow.root.children[0].serialize()
                }
            }, function (t) {
                e.flow.id = t.data.id, e.renderList(null, !0)
            }, winkstart.error_message.process_error())
    },
    save: function () {
        var e = this;
        if (e.flow.numbers && e.flow.numbers.length > 0) {
            var t = {
                numbers: e.flow.numbers,
                flow: e.flow.root.children[0] == undefined ? {} : e.flow.root.children[0].serialize()
            };
            e.flow.name !== "" && (t.name = e.flow.name), "contact_list" in e.flow && (t.contact_list = {
                exclude: e.flow.contact_list.exclude || !1
            }), e.flow.id ? winkstart.postJSON("callflow.update", {
                account_id: winkstart.apps.voip.account_id,
                api_url: winkstart.apps.voip.api_url,
                callflow_id: e.flow.id,
                data: t
            }, function (t) {
                e.renderList(), e.editCallflow({
                    id: t.data.id
                })
            }, winkstart.error_message.process_error()) : winkstart.putJSON("callflow.create", {
                account_id: winkstart.apps.voip.account_id,
                api_url: winkstart.apps.voip.api_url,
                data: t
            }, function (t) {
                e.renderList(), e.editCallflow({
                    id: t.data.id
                })
            }, winkstart.error_message.process_error())
        } else winkstart.alert(_t("callflow", "you_need_to_select_a_number"))
    },
    renderList: function (e, t) {
        var n = this,
            r = t ? "callflow.list_no_loading" : "callflow.list";
        winkstart.request(!0, r, {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url
        }, function (t, n) {
            function r(e) {
                var t = [],
                    n;
                return e.length > 0 && _.each(e, function (e) {
                    if (e.numbers)
                        for (var n = 0; n < e.numbers.length; n++) e.numbers[n] = e.numbers[n].replace(/^$/, "(no number)");
                    $.isArray(e.numbers) && e.featurecode == 0 && t.push({
                        id: e.id,
                        title: e.name ? e.name : e.numbers ? e.numbers.toString() : ""
                    })
                }), t.sort(function (e, t) {
                    return e.title.toLowerCase() < t.title.toLowerCase() ? n = -1 : n = 1, n
                }), t
            }
            var i = {};
            i.label = _t("callflow", "callflow_module_label"), i.identifier = "callflow-module-listview", i.new_entity_label = _t("callflow", "add_callflow_label"), i.data = r(t.data), i.publisher = winkstart.publish, i.notifyMethod = "callflow.list-panel-click", i.notifyCreateMethod = "callflow.edit-callflow", $("#callflow-listpanel").empty(), $("#callflow-listpanel").listpanel(i), typeof e == "function" && e()
        })
    },
    define_stats: function () {
        var e = {
            callflows: {
                icon: "callflow",
                get_stat: function (e) {
                    winkstart.request("callflow.list_no_loading", {
                        account_id: winkstart.apps.voip.account_id,
                        api_url: winkstart.apps.voip.api_url
                    }, function (t, n) {
                        $.each(t.data, function () {
                            this.featurecode && t.data.length--
                        });
                        var r = {
                            name: "callflows",
                            number: t.data.length,
                            active: t.data.length > 0 ? !0 : !1,
                            color: t.data.length < 1 ? "red" : t.data.length > 1 ? "green" : "orange"
                        };
                        typeof e == "function" && e(r)
                    }, function (t, n) {
                        e({
                            error: !0
                        })
                    })
                },
                click_handler: function () {
                    winkstart.publish("callflow.activate")
                }
            }
        };
        return e
    },
    groups_list: function (e) {
        winkstart.request(!0, "callflow.list_groups", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url
        }, function (t, n) {
            e && e(t.data)
        })
    },
    devices_list: function (e) {
        winkstart.request(!0, "callflow.list_devices", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url
        }, function (t, n) {
            e && e(t.data)
        })
    },
    users_list: function (e) {
        winkstart.request(!0, "callflow.list_users", {
            account_id: winkstart.apps.voip.account_id,
            api_url: winkstart.apps.voip.api_url
        }, function (t, n) {
            e && e(t.data)
        })
    },
    define_callflow_nodes: function (e) {
        var t = this,
            n = function (e, n) {
                var e = e,
                    n = n;
                winkstart.request(!0, "device.list", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url
                }, function (r, i) {
                    var s, o, u, a;
                    selected_endpoints = {}, unselected_endpoints = [], unselected_groups = [], unselected_devices = [], unselected_users = [], (a = e.getMetadata("endpoints")) && $.each($.extend(!0, {}, a), function (e, t) {
                        t.name = "Undefined Device", selected_endpoints[t.id] = t
                    }), $.each(r.data, function (e, t) {
                        t.endpoint_type = "device", t.id in selected_endpoints ? (selected_endpoints[t.id].endpoint_type = "device", selected_endpoints[t.id].owner_id = t.owner_id, selected_endpoints[t.id].name = t.name) : unselected_devices.push(t)
                    }), winkstart.request("groups.list", {
                        account_id: winkstart.apps.voip.account_id,
                        api_url: winkstart.apps.voip.api_url
                    }, function (r, i) {
                        $.each(r.data, function (e, t) {
                            t.endpoint_type = "group", t.id in selected_endpoints ? (selected_endpoints[t.id].endpoint_type = "group", selected_endpoints[t.id].name = t.name) : unselected_groups.push(t)
                        }), winkstart.request("user.list", {
                            account_id: winkstart.apps.voip.account_id,
                            api_url: winkstart.apps.voip.api_url
                        }, function (r, i) {
                            $.each(r.data, function (e, t) {
                                t.name = t.first_name + " " + t.last_name, t.endpoint_type = "user", t.id in selected_endpoints ? (selected_endpoints[t.id].endpoint_type = "user", selected_endpoints[t.id].name = t.name) : unselected_users.push(t)
                            }), o = t.templates.page_group_dialog.tmpl({
                                _t: function (e) {
                                    return window.translate.callflow[e]
                                },
                                form: {
                                    name: e.getMetadata("name") || ""
                                }
                            }), $.each(unselected_groups, function () {
                                $("#groups_pane .connect.left", o).append(t.templates.page_group_element.tmpl(this))
                            }), $.each(unselected_devices, function () {
                                $("#devices_pane .connect.left", o).append(t.templates.page_group_element.tmpl(this))
                            }), $.each(unselected_users, function () {
                                $("#users_pane .connect.left", o).append(t.templates.page_group_element.tmpl(this))
                            }), $.each(selected_endpoints, function () {
                                this.endpoint_type && $(".connect.right", o).append(t.templates.page_group_element.tmpl(this))
                            }), $("#name", o).bind("keyup blur change", function () {
                                $(".column.right .title", o).html("Page Group - " + $(this).val())
                            }), $("ul.settings1 > li > a", o).click(function (e) {
                                $(".pane_content", o).hide(), $(".searchfield", o).val(""), $(".column.left li", o).show(), $("ul.settings1 > li", o).removeClass("current");
                                var t = $(this).attr("id");
                                t === "users_tab_link" ? $("#users_pane", o).show() : t === "devices_tab_link" ? $("#devices_pane", o).show() : t === "groups_tab_link" && $("#groups_pane", o).show(), $(this).parent().addClass("current")
                            }), $(".searchsubmit2", o).click(function () {
                                $(".searchfield", o).val(""), $(".column li", o).show()
                            }), $("#devices_pane .searchfield", o).keyup(function () {
                                $("#devices_pane .column.left li").each(function () {
                                    $(".item_name", $(this)).html().toLowerCase().indexOf($("#devices_pane .searchfield", o).val().toLowerCase()) == -1 ? $(this).hide() : $(this).show()
                                })
                            }), $("#users_pane .searchfield", o).keyup(function () {
                                $("#users_pane .column.left li").each(function () {
                                    $(".item_name", $(this)).html().toLowerCase().indexOf($("#users_pane .searchfield", o).val().toLowerCase()) == -1 ? $(this).hide() : $(this).show()
                                })
                            }), $("#groups_pane .searchfield", o).keyup(function () {
                                $("#groups_pane .column.left li").each(function () {
                                    $(".item_name", $(this)).html().toLowerCase().indexOf($("#groups_pane .searchfield", o).val().toLowerCase()) == -1 ? $(this).hide() : $(this).show()
                                })
                            }), jQuery.isEmptyObject(selected_endpoints) ? $(".column.right .connect", o).addClass("no_element") : $(".column.right .connect", o).removeClass("no_element"), $(".column.left .options", o).hide(), $(".column.left .actions", o).hide(), $(".options .option.delay", o).bind("keyup", function () {
                                $(this).parents("li").dataset("delay", $(this).val())
                            }), $(".options .option.timeout", o).bind("keyup", function () {
                                $(this).parents("li").dataset("timeout", $(this).val())
                            }), $("#save_ring_group", o).click(function () {
                                var t = $("#name", o).val();
                                a = [], $(".right .connect li", o).each(function () {
                                    var e = $(this).dataset();
                                    delete e.owner_id, a.push(e)
                                }), e.setMetadata("endpoints", a), e.setMetadata("name", t), e.caption = t, s.dialog("close")
                            }), s = winkstart.dialog(o, {
                                title: _t("callflow", "page_group_title"),
                                beforeClose: function () {
                                    typeof n == "function" && n()
                                }
                            }), $(".scrollable", s).jScrollPane({
                                horizontalDragMinWidth: 0,
                                horizontalDragMaxWidth: 0
                            }), $(".connect", s).sortable({
                                connectWith: $(".connect.right", s),
                                zIndex: 2e3,
                                helper: "clone",
                                appendTo: $(".wrapper", s),
                                scroll: !1,
                                receive: function (e, t) {
                                    var n = t.item.dataset(),
                                        r = [],
                                        i;
                                    n.endpoint_type === "device" ? (i = _t("callflow", "the_owner_of_this_device_is_already"), $(".connect.right li", o).each(function () {
                                        $(this).dataset("id") === n.owner_id && r.push($(this))
                                    })) : n.endpoint_type === "user" && (i = _t("callflow", "this_user_has_already_some_devices"), $(".connect.right li", o).each(function () {
                                        $(this).dataset("owner_id") === n.id && r.push($(this))
                                    })), r.length > 0 && winkstart.confirm(i, function () {
                                        $.each(r, function () {
                                            u(this)
                                        })
                                    }, function () {
                                        u(t.item)
                                    }), $(this).hasClass("right") && ($(".options", t.item).show(), $(".actions", t.item).show(), $(".column.right .connect", s).removeClass("no_element"))
                                }
                            }), $(o).delegate(".trash", "click", function () {
                                var e = $(this).parents("li").first();
                                u(e)
                            }), $(".pane_content", o).hide(), $("#users_pane", o).show();
                            var u = function (e) {
                                var n = e,
                                    r = n.dataset();
                                r.name = jQuery.trim($(".item_name", n).html()), $("#" + r.endpoint_type + "s_pane .connect.left", o).append(t.templates.page_group_element.tmpl(r)), n.remove(), $(".connect.right li", o).size() == 0 && $(".column.right .connect", s).addClass("no_element"), r.name.toLowerCase().indexOf($("#" + r.endpoint_type + "s_pane .searchfield", o).val().toLowerCase()) == -1 && $("#" + r.id, o).hide()
                            }
                        })
                    })
                })
            },
            r = function (e, n) {
                var r = "20",
                    i = "0",
                    e = e,
                    n = n;
                winkstart.request(!0, "device.list", {
                    account_id: winkstart.apps.voip.account_id,
                    api_url: winkstart.apps.voip.api_url
                }, function (s, o) {
                    var u, a, f, l;
                    selected_endpoints = {}, unselected_endpoints = [], unselected_groups = [], unselected_devices = [], unselected_users = [], (l = e.getMetadata("endpoints")) && $.each($.extend(!0, {}, l), function (e, t) {
                        t.name = _t("callflow", "undefined_device"), selected_endpoints[t.id] = t
                    }), $.each(s.data, function (e, t) {
                        t.endpoint_type = "device", t.id in selected_endpoints ? (selected_endpoints[t.id].endpoint_type = "device", selected_endpoints[t.id].owner_id = t.owner_id, selected_endpoints[t.id].name = t.name) : (t.delay = i, t.timeout = r, unselected_devices.push(t))
                    }), winkstart.request("groups.list", {
                        account_id: winkstart.apps.voip.account_id,
                        api_url: winkstart.apps.voip.api_url
                    }, function (s, o) {
                        $.each(s.data, function (e, t) {
                            t.endpoint_type = "group", t.id in selected_endpoints ? (selected_endpoints[t.id].endpoint_type = "group", selected_endpoints[t.id].name = t.name) : (t.delay = i, t.timeout = r, unselected_groups.push(t))
                        }), winkstart.request("user.list", {
                            account_id: winkstart.apps.voip.account_id,
                            api_url: winkstart.apps.voip.api_url
                        }, function (s, o) {
                            $.each(s.data, function (e, t) {
                                t.name = t.first_name + " " + t.last_name, t.endpoint_type = "user", t.id in selected_endpoints ? (selected_endpoints[t.id].endpoint_type = "user", selected_endpoints[t.id].name = t.name) : (t.delay = i, t.timeout = r, unselected_users.push(t))
                            }), a = t.templates.ring_group_dialog.tmpl({
                                _t: function (e) {
                                    return window.translate.callflow[e]
                                },
                                form: {
                                    name: e.getMetadata("name") || "",
                                    strategy: {
                                        items: [{
                                            id: "simultaneous",
                                            name: _t("callflow", "at_the_same_time")
                                        }, {
                                            id: "single",
                                            name: _t("callflow", "in_order")
                                        }],
                                        selected: e.getMetadata("strategy") || "simultaneous"
                                    },
                                    timeout: e.getMetadata("timeout") || "30"
                                }
                            }), $.each(unselected_groups, function () {
                                $("#groups_pane .connect.left", a).append(t.templates.ring_group_element.tmpl(this))
                            }), $.each(unselected_devices, function () {
                                $("#devices_pane .connect.left", a).append(t.templates.ring_group_element.tmpl(this))
                            }), $.each(unselected_users, function () {
                                $("#users_pane .connect.left", a).append(t.templates.ring_group_element.tmpl(this))
                            }), $.each(selected_endpoints, function () {
                                this.endpoint_type && $(".connect.right", a).append(t.templates.ring_group_element.tmpl(this))
                            }), $("#name", a).bind("keyup blur change", function () {
                                $(".column.right .title", a).html(_t("callflow", "ring_group_val") + $(this).val())
                            }), $("ul.settings1 > li > a", a).click(function (e) {
                                $(".pane_content", a).hide(), $(".searchfield", a).val(""), $(".column.left li", a).show(), $("ul.settings1 > li", a).removeClass("current");
                                var t = $(this).attr("id");
                                t === "users_tab_link" ? $("#users_pane", a).show() : t === "devices_tab_link" ? $("#devices_pane", a).show() : t === "groups_tab_link" && $("#groups_pane", a).show(), $(this).parent().addClass("current")
                            }), $(".searchsubmit2", a).click(function () {
                                $(".searchfield", a).val(""), $(".column li", a).show()
                            }), $("#devices_pane .searchfield", a).keyup(function () {
                                $("#devices_pane .column.left li").each(function () {
                                    $(".item_name", $(this)).html().toLowerCase().indexOf($("#devices_pane .searchfield", a).val().toLowerCase()) == -1 ? $(this).hide() : $(this).show()
                                })
                            }), $("#users_pane .searchfield", a).keyup(function () {
                                $("#users_pane .column.left li").each(function () {
                                    $(".item_name", $(this)).html().toLowerCase().indexOf($("#users_pane .searchfield", a).val().toLowerCase()) == -1 ? $(this).hide() : $(this).show()
                                })
                            }), $("#groups_pane .searchfield", a).keyup(function () {
                                $("#groups_pane .column.left li").each(function () {
                                    $(".item_name", $(this)).html().toLowerCase().indexOf($("#groups_pane .searchfield", a).val().toLowerCase()) == -1 ? $(this).hide() : $(this).show()
                                })
                            }), jQuery.isEmptyObject(selected_endpoints) ? $(".column.right .connect", a).addClass("no_element") : $(".column.right .connect", a).removeClass("no_element"), $(".column.left .options", a).hide(), $(".column.left .actions", a).hide(), $(".options .option.delay", a).bind("keyup", function () {
                                $(this).parents("li").dataset("delay", $(this).val())
                            }), $(".options .option.timeout", a).bind("keyup", function () {
                                $(this).parents("li").dataset("timeout", $(this).val())
                            }), $("#save_ring_group", a).click(function () {
                                var t = $("#name", a).val(),
                                    n = 0,
                                    r = $("#strategy", a).val();
                                l = [];
                                if (r === "simultaneous") var i = function (e, t, n) {
                                    var r = e + t;
                                    return r > n && (n = r), n
                                };
                                else var i = function (e, t, n) {
                                    return n += e + t, n
                                };
                                $(".right .connect li", a).each(function () {
                                    var e = $(this).dataset();
                                    delete e.owner_id, l.push(e), n = i(parseFloat(e.delay), parseFloat(e.timeout), n)
                                }), e.setMetadata("endpoints", l), e.setMetadata("name", t), e.setMetadata("strategy", r), e.setMetadata("timeout", n), e.caption = t, u.dialog("close")
                            }), u = winkstart.dialog(a, {
                                title: _t("callflow", "ring_group"),
                                beforeClose: function () {
                                    typeof n == "function" && n()
                                }
                            }), $(".scrollable", u).jScrollPane({
                                horizontalDragMinWidth: 0,
                                horizontalDragMaxWidth: 0
                            }), $(".connect", u).sortable({
                                connectWith: $(".connect.right", u),
                                zIndex: 2e3,
                                helper: "clone",
                                appendTo: $(".wrapper", u),
                                scroll: !1,
                                receive: function (e, t) {
                                    var n = t.item.dataset(),
                                        r = [],
                                        i;
                                    n.endpoint_type === "device" ? (i = _t("callflow", "the_owner_of_this_device_is_already"), $(".connect.right li", a).each(function () {
                                        $(this).dataset("id") === n.owner_id && r.push($(this))
                                    })) : n.endpoint_type === "user" && (i = _t("callflow", "this_user_has_already_some_devices"), $(".connect.right li", a).each(function () {
                                        $(this).dataset("owner_id") === n.id && r.push($(this))
                                    })), r.length > 0 && winkstart.confirm(i, function () {
                                        $.each(r, function () {
                                            f(this)
                                        })
                                    }, function () {
                                        f(t.item)
                                    }), $(this).hasClass("right") && ($(".options", t.item).show(), $(".actions", t.item).show(), $(".column.right .connect", u).removeClass("no_element"))
                                }
                            }), $(a).delegate(".trash", "click", function () {
                                var e = $(this).parents("li").first();
                                f(e)
                            }), $(".pane_content", a).hide(), $("#users_pane", a).show();
                            var f = function (e) {
                                var n = e,
                                    r = n.dataset();
                                r.name = jQuery.trim($(".item_name", n).html()), $("#" + r.endpoint_type + "s_pane .connect.left", a).append(t.templates.ring_group_element.tmpl(r)), n.remove(), $(".connect.right li", a).size() == 0 && $(".column.right .connect", u).addClass("no_element"), r.name.toLowerCase().indexOf($("#" + r.endpoint_type + "s_pane .searchfield", a).val().toLowerCase()) == -1 && $("#" + r.id, a).hide()
                            }
                        })
                    })
                })
            };
        $.extend(e, {
            root: {
                name: "Root",
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "false"
            },
            "callflow[id=*]": {
                name: _t("callflow", "callflow"),
                icon: "callflow",
                category: _t("config", "advanced_cat"),
                module: "callflow",
                tip: _t("callflow", "callflow_tip"),
                data: {
                    id: "null"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    var n = e.getMetadata("id"),
                        r = "";
                    return n in t && "numbers" in t[n] && (r = t[n].numbers.toString()), r
                },
                edit: function (e, n) {
                    winkstart.request(!0, "callflow.list", {
                        account_id: winkstart.apps.voip.account_id,
                        api_url: winkstart.apps.voip.api_url
                    }, function (r, i) {
                        var s, o, u = [];
                        $.each(r.data, function () {
                            !this.featurecode && this.id != t.flow.id && (this.name = this.name ? this.name : this.numbers ? this.numbers.toString() : _t("callflow", "no_numbers"), u.push(this))
                        }), o = t.templates.edit_dialog.tmpl({
                            _t: function (e) {
                                return window.translate.callflow[e]
                            },
                            objects: {
                                type: "callflow",
                                items: u,
                                selected: e.getMetadata("id") || ""
                            }
                        }), $("#add", o).click(function () {
                            e.setMetadata("id", $("#object-selector", o).val()), e.caption = $("#object-selector option:selected", o).text(), s.dialog("close")
                        }), s = winkstart.dialog(o, {
                            title: _t("callflow", "callflow_title"),
                            beforeClose: function () {
                                typeof n == "function" && n()
                            }
                        })
                    })
                }
            },
            "page_group[]": {
                name: _t("callflow", "page_group"),
                icon: "ring_group",
                category: _t("config", "advanced_cat"),
                module: "page_group",
                tip: _t("callflow", "page_group_tip"),
                data: {
                    name: ""
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return e.getMetadata("name") || ""
                },
                edit: function (e, t) {
                    n(e, t)
                }
            },
            "ring_group[]": {
                name: _t("callflow", "ring_group"),
                icon: "ring_group",
                category: _t("config", "basic_cat"),
                module: "ring_group",
                tip: _t("callflow", "ring_group_tip"),
                data: {
                    name: ""
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return e.getMetadata("name") || ""
                },
                edit: function (e, t) {
                    r(e, t)
                }
            },
            "call_forward[action=activate]": {
                name: _t("callflow", "enable_call_forwarding"),
                icon: "rightarrow",
                category: _t("config", "call_forwarding_cat"),
                module: "call_forward",
                tip: _t("callflow", "enable_call_forwarding_tip"),
                data: {
                    action: "activate"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return ""
                },
                edit: function (e, t) {
                    typeof t == "function" && t()
                }
            },
            "call_forward[action=deactivate]": {
                name: _t("callflow", "disable_call_forwarding"),
                icon: "rightarrow",
                category: _t("config", "call_forwarding_cat"),
                module: "call_forward",
                tip: _t("callflow", "disable_call_forwarding_tip"),
                data: {
                    action: "deactivate"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return ""
                },
                edit: function (e, t) {
                    typeof t == "function" && t()
                }
            },
            "call_forward[action=update]": {
                name: _t("callflow", "update_call_forwarding"),
                icon: "rightarrow",
                category: _t("config", "call_forwarding_cat"),
                module: "call_forward",
                tip: _t("callflow", "update_call_forwarding_tip"),
                data: {
                    action: "update"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return ""
                },
                edit: function (e, t) {
                    typeof t == "function" && t()
                }
            },
            "dynamic_cid[]": {
                name: _t("callflow", "dynamic_cid"),
                icon: "rightarrow",
                category: _t("config", "caller_id_cat"),
                module: "dynamic_cid",
                tip: _t("callflow", "dynamic_cid_tip"),
                isUsable: "true",
                caption: function (e, t) {
                    return ""
                },
                edit: function (e, t) {
                    typeof t == "function" && t()
                }
            },
            "prepend_cid[action=prepend]": {
                name: _t("callflow", "prepend"),
                icon: "plus_circle",
                category: _t("config", "caller_id_cat"),
                module: "prepend_cid",
                tip: _t("callflow", "prepend_tip"),
                data: {
                    action: "prepend",
                    caller_id_name_prefix: "",
                    caller_id_number_prefix: ""
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return (e.getMetadata("caller_id_name_prefix") || "") + " " + (e.getMetadata("caller_id_number_prefix") || "")
                },
                edit: function (e, n) {
                    var r, i;
                    i = t.templates.prepend_cid_callflow.tmpl({
                        _t: function (e) {
                            return window.translate.callflow[e]
                        },
                        data_cid: {
                            caller_id_name_prefix: e.getMetadata("caller_id_name_prefix") || "",
                            caller_id_number_prefix: e.getMetadata("caller_id_number_prefix") || ""
                        }
                    }), $("#add", i).click(function () {
                        var t = $("#cid_name_prefix", i).val(),
                            n = $("#cid_number_prefix", i).val();
                        e.setMetadata("caller_id_name_prefix", t), e.setMetadata("caller_id_number_prefix", n), e.caption = t + " " + n, r.dialog("close")
                    }), r = winkstart.dialog(i, {
                        title: _t("callflow", "prepend_caller_id_title"),
                        minHeight: "0",
                        beforeClose: function () {
                            typeof n == "function" && n()
                        }
                    }), typeof n == "function" && n()
                }
            },
	    "automatic_cid[]": {
                name: "Automatic CID",
                icon: "rightarrow",
                category: _t("config", "caller_id_cat"),
                module: "automatic_cid",
                tip: "Automatic CID",
                data: {
		    caller_id_override:"",
		    caller_id_override_select: false,
		    group_id: "",
                    caller_id_name_prefix: "",
                    caller_id_number_prefix: ""
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return (e.getMetadata("caller_id_override") || "") 
                },
		
                edit: function (e, n) {
                    var r, i;
		    var val = 1;
		    for(a=1;a<e.getMetadata("patterns").length;a++){
			var edit_row = '<div id="p_new'+a+'">(<input type="text" id="cid_name_prefix'+a+'0" placeholder="prepend" value="${data_cid.pattern['+a+'].prepend}" style="width: 75px;"/>)+<input type="text" id="cid_name_prefix'+a+'1" placeholder="prefix" value="${data_cid.pattern['+a+'].prefix}" style="width: 75px;"/>|<input type="text" id="cid_name_prefix'+a+'2" placeholder="match pattern" value="${data_cid.pattern['+a+'].prefix}" style="width: 150px;"/><input type="checkbox" id="remove'+a+'" class="featurecode_enabled"/></div>';
			$('#addinput').append(edit_row);
			val++;
		     }
		     //for(a=0;a<e.getMetadata("group_id").length;a++){
							
			//}
		    winkstart.parallel({
		         groups: function (e) {
		             t.groups_list(function (t) {
		                  e(null, t)
		             })
		         }
		    },function(q,list){
                    i = t.templates.automatic_cid_callflow.tmpl({
                        _t: function (e) {
                            return window.translate.callflow[e]
                        },
                        data_cid: {
                            caller_id_override: e.getMetadata("caller_id_override") || "",
                            caller_id_override_select: e.getMetadata("caller_id_override_select") || "",
			    items: list.groups,
                            selected:e.getMetadata("group_id")|| "",
			    pattern:e.getMetadata("patterns")|| "",
			    enabled:e.getMetadata("caller_id_override_select")|| ""
                        }
                    }),$("#addautocid").die('click').live('click',function () {
			var pattern =[];
                        var c = $("#caller_id_override", i).val(),
                            n = $('#caller_id_override_select',i).prop('checked'),
			    sel = $("#endpoint_selector", i).val();
		        for(k=0;k<val;k++){ 
					if($("#p_new"+k).length>0){
						var re = $("#cid_name_prefix"+k+"2", i).val();
						var regex = "^\\+?";
						for (var a = 0, len = re.length; a < len; a++) {
							if( re[a]=='X' ){
							regex =	regex.concat("[0-9]");	
							}else if(re[a]=='Z'){
							regex =	regex.concat("[1-9]");						
							}else if(re[a]=='N'){
							regex =	regex.concat("[2-9]");						
							}else{
							regex =	regex.concat(re[a]);
							}
						}
						regex = regex.concat("$");
						pattern.push({
							prepend: $("#cid_name_prefix"+k+"0", i).val(),
							prefix: $("#cid_name_prefix"+k+"1", i).val(),
						   match_pattern: $("#cid_name_prefix"+k+"2", i).val(),
							regex:	regex,
						})					
					}
			    }
                        e.setMetadata("caller_id_override", c), e.setMetadata("caller_id_override_select", n),e.setMetadata("patterns", pattern),e.setMetadata("group_id", sel), e.caption = c ,r.dialog("close")
                    }),$("#endpoint_selector",i).val(e.getMetadata("group_id")),
$('#addNew').die('click').live('click', function() {
			var row = '<div id="p_new'+val+'">(<input type="text" id="cid_name_prefix'+val+'0" placeholder="prepend" value="" style="width: 75px;"/>)+<input type="text" id="cid_name_prefix'+val+'1" placeholder="prefix" value="" style="width: 75px;"/>|<input type="text" id="cid_name_prefix'+val+'2" placeholder="match pattern" value="" style="width: 150px;"/><input type="checkbox" id="remove'+val+'" class="featurecode_enabled"/></div>';
			$('#addinput').append(row);
			val++;
			return false;
		    }),$('#removeBtn').die('click').live('click', function() {
			for(k=0;k<val;k++){ 
				var l = $("#remove"+k,i).prop('checked');
				if(l){
					$("#p_new"+k).remove();	
				}	
			}
			
			
		    }),r = winkstart.dialog(i, {
                        title: "Automatic Caller ID",
                        minHeight: "0",
                        beforeClose: function () {
                            typeof n == "function" && n()
                        }
                    }), typeof n == "function" && n()
})
                }
            },
            "prepend_cid[action=reset]": {
                name: _t("callflow", "reset_prepend"),
                icon: "loop2",
                category: _t("config", "caller_id_cat"),
                module: "prepend_cid",
                tip: _t("callflow", "reset_prepend_tip"),
                data: {
                    action: "reset"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return ""
                },
                edit: function (e, t) {
                    typeof t == "function" && t()
                }
            },
            "manual_presence[]": {
                name: _t("callflow", "manual_presence"),
                icon: "lightbulb_on",
                category: _t("config", "advanced_cat"),
                module: "manual_presence",
                tip: _t("callflow", "manual_presence_tip"),
                data: {},
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return e.getMetadata("presence_id") || ""
                },
                edit: function (e, n) {
                    var r, i;
                    i = t.templates.presence_callflow.tmpl({
                        _t: function (e) {
                            return window.translate.callflow[e]
                        },
                        data_presence: {
                            presence_id: e.getMetadata("presence_id") || "",
                            status: e.getMetadata("status") || "busy"
                        }
                    }), $("#add", i).click(function () {
                        var t = $("#presence_id_input", i).val();
                        e.setMetadata("presence_id", t), e.setMetadata("status", $("#presence_status option:selected", i).val()), e.caption = t, r.dialog("close")
                    }), r = winkstart.dialog(i, {
                        title: _t("callflow", "manual_presence_title"),
                        beforeClose: function () {
                            typeof n == "function" && n()
                        }
                    })
                }
            },
            "group_pickup[]": {
                name: _t("callflow", "group_pickup"),
                icon: "sip",
                category: _t("config", "advanced_cat"),
                module: "group_pickup",
                tip: _t("callflow", "group_pickup_tip"),
                data: {},
                rules: [{
                    type: "quantity",
                    maxSize: "0"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return e.getMetadata("name") || ""
                },
                edit: function (e, n) {
                    winkstart.parallel({
                        groups: function (e) {
                            t.groups_list(function (t) {
                                e(null, t)
                            })
                        },
                        users: function (e) {
                            t.users_list(function (t) {
                                e(null, t)
                            })
                        },
                        devices: function (e) {
                            t.devices_list(function (t) {
                                e(null, t)
                            })
                        }
                    }, function (r, i) {
                        var s, o;
                        o = t.templates.group_pickup.tmpl({
                            _t: function (e) {
                                return window.translate.callflow[e]
                            },
                            data: {
                                items: i,
                                selected: e.getMetadata("device_id") || e.getMetadata("group_id") || e.getMetadata("user_id") || ""
                            }
                        }), $("#add", o).click(function () {
                            var t = $("#endpoint_selector", o),
                                n = t.val(),
                                r = t.find("#" + n).html(),
                                i = $("#" + n, o).data("type"),
                                u = i.substring(i, i.length - 1) + "_id";
                            e.data.data = {}, e.setMetadata(u, n), e.setMetadata("name", r), e.caption = r, s.dialog("close")
                        }), s = winkstart.dialog(o, {
                            title: _t("callflow", "select_endpoint_title"),
                            minHeight: "0",
                            beforeClose: function () {
                                typeof n == "function" && n()
                            }
                        })
                    })
                }
            },
            "receive_fax[]": {
                name: _t("callflow", "receive_fax"),
                icon: "sip",
                category: _t("config", "advanced_cat"),
                module: "receive_fax",
                tip: _t("callflow", "receive_fax_tip"),
                data: {
                    owner_id: null
                },
                rules: [{
                    type: "quantity",
                    maxSize: "0"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return ""
                },
                edit: function (e, n) {
                    winkstart.request("user.list", {
                        account_id: winkstart.apps.voip.account_id,
                        api_url: winkstart.apps.voip.api_url
                    }, function (r, i) {
                        var s, o;
                        $.each(r.data, function () {
                            this.name = this.first_name + " " + this.last_name
                        }), o = t.templates.fax_callflow.tmpl({
                            _t: function (e) {
                                return window.translate.callflow[e]
                            },
                            objects: {
                                items: r.data,
                                selected: e.getMetadata("owner_id") || ""
                            }
                        }), $("#user_selector option:selected", o).val() == undefined && $("#edit_link", o).hide(), $(".inline_action", o).click(function (t) {
                            var n = $(this).dataset("action") == "edit" ? {
                                id: $("#user_selector", o).val()
                            } : {};
                            t.preventDefault(), winkstart.publish("user.popup_edit", n, function (t) {
                                e.setMetadata("owner_id", t.data.id || "null"), s.dialog("close")
                            })
                        }), $("#add", o).click(function () {
                            e.setMetadata("owner_id", $("#user_selector", o).val()), s.dialog("close")
                        }), s = winkstart.dialog(o, {
                            title: _t("callflow", "select_user_title"),
                            minHeight: "0",
                            beforeClose: function () {
                                typeof n == "function" && n()
                            }
                        })
                    })
                }
            },
            "record_call[action=start]": {
                name: _t("callflow", "start_call_recording"),
                icon: "conference",
                category: _t("config", "call_recording_cat"),
                module: "record_call",
                tip: _t("callflow", "start_call_recording_tip"),
                data: {
                    action: "start"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e) {
                    return ""
                },
                edit: function (e, n) {
                    var r, i;
		    var accountHttp = new XMLHttpRequest();
			 accountHttp.open("GET",winkstart.apps.voip.api_url+'/accounts/'+winkstart.apps.voip.account_id+'?auth_token='+winkstart.apps.voip.auth_token, false);	
		    accountHttp.send();
                    var jsonResponse = JSON.parse(accountHttp.responseText);
		    if(jsonResponse.data.hasOwnProperty("recordingUrl")){
		    	var urll = jsonResponse.data.recordingUrl;
		    }else{
			var urll = '';
		    }
	           // var urll = jsonResponse.data.recordingUrl;
                    i = t.templates.call_record_callflow.tmpl({
                        _t: function (e) {
                            return window.translate.callflow[e]
                        },
                        data_call_record: {
                            format: e.getMetadata("format") || "mp3",
                            url: e.getMetadata("url") || urll,
                            time_limit: e.getMetadata("time_limit") || "600"
                        }
                    }), $("#add", i).click(function () {
                        e.setMetadata("url", $("#url", i).val()), e.setMetadata("format", $("#format", i).val()), e.setMetadata("time_limit", $("#time_limit", i).val()), r.dialog("close")
                    }), r = winkstart.dialog(i, {
                        title: _t("callflow", "start_call_recording"),
                        minHeight: "0",
                        beforeClose: function () {
                            typeof n == "function" && n()
                        }
                    })
                }
            },
            "record_call[action=stop]": {
                name: _t("callflow", "stop_call_recording"),
                icon: "conference",
                category: _t("config", "call_recording_cat"),
                module: "record_call",
                tip: _t("callflow", "stop_call_recording_tip"),
                data: {
                    action: "stop"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e) {
                    return ""
                },
                edit: function (e, t) {}
            },
            "pivot[]": {
                name: _t("callflow", "pivot"),
                icon: "conference",
                category: _t("config", "advanced_cat"),
                module: "pivot",
                tip: _t("callflow", "pivot_tip"),
                data: {
                    method: "get",
                    req_timeout: "5",
                    req_format: "twiml",
                    voice_url: ""
                },
                rules: [{
                    type: "quantity",
                    maxSize: "0"
                }],
                isUsable: "true",
                caption: function (e) {
                    return ""
                },
                edit: function (e, n) {
                    var r, i;
                    i = t.templates.pivot_callflow.tmpl({
                        _t: function (e) {
                            return window.translate.callflow[e]
                        },
                        data_pivot: {
                            method: e.getMetadata("method") || "get",
                            voice_url: e.getMetadata("voice_url") || "",
                            req_timeout: e.getMetadata("req_timeout") || "5",
                            req_format: e.getMetadata("req_format") || "twiml"
                        }
                    }), $("#add", i).click(function () {
                        e.setMetadata("voice_url", $("#pivot_voiceurl_input", i).val()), e.setMetadata("method", $("#pivot_method_input", i).val()), e.setMetadata("req_format", $("#pivot_format_input", i).val()), r.dialog("close")
                    }), r = winkstart.dialog(i, {
                        title: _t("callflow", "pivot_title"),
                        minHeight: "0",
                        beforeClose: function () {
                            typeof n == "function" && n()
                        }
                    })
                }
            },
            "disa[]": {
                name: _t("callflow", "disa"),
                icon: "conference",
                category: _t("config", "advanced_cat"),
                module: "disa",
                tip: _t("callflow", "disa_tip"),
                data: {
                    pin: "",
                    retries: "3"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "0"
                }],
                isUsable: "true",
                caption: function (e) {
                    return ""
                },
                edit: function (e, n) {
                    var r, i;
                    i = t.templates.disa_callflow.tmpl({
                        _t: function (e) {
                            return window.translate.callflow[e]
                        },
                        data_disa: {
                            pin: e.getMetadata("pin") || "",
                            retries: e.getMetadata("retries") || "3"
                        }
                    }), $("#add", i).click(function () {
                        var t = function () {
                            e.setMetadata("pin", $("#disa_pin_input", i).val()), e.setMetadata("retries", $("#disa_retries_input", i).val()), r.dialog("close")
                        };
                        $("#disa_pin_input", i).val() == "" ? winkstart.confirm(_t("callflow", "not_setting_a_pin"), function () {
                            t()
                        }) : t()
                    }), r = winkstart.dialog(i, {
                        title: _t("callflow", "disa_title"),
                        minHeight: "0",
                        beforeClose: function () {
                            typeof n == "function" && n()
                        }
                    })
                }
            },
            "response[]": {
                name: _t("callflow", "response"),
                icon: "rightarrow",
                category: _t("config", "advanced_cat"),
                module: "response",
                tip: _t("callflow", "response_tip"),
                data: {
                    code: "",
                    message: "",
                    media: "null"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "0"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return _t("callflow", "sip_code_caption") + e.getMetadata("code")
                },
                edit: function (e, n) {
                    winkstart.request(!0, "callflow.list_media", {
                        account_id: winkstart.apps.voip.account_id,
                        api_url: winkstart.apps.voip.api_url
                    }, function (r, i) {
                        var s, o;
                        o = t.templates.response_callflow.tmpl({
                            _t: function (e) {
                                return window.translate.callflow[e]
                            },
                            response_data: {
                                items: r.data,
                                media_enabled: e.getMetadata("media") ? !0 : !1,
                                selected_media: e.getMetadata("media") || "",
                                code: e.getMetadata("code") || "",
                                message: e.getMetadata("message") || ""
                            }
                        }), ($("#media_selector option:selected", o).val() == undefined || $("#media_selector option:selected", o).val() == "null") && $("#edit_link", o).hide(), $("#media_selector", o).change(function () {
                            $("#media_selector option:selected", o).val() == undefined || $("#media_selector option:selected", o).val() == "null" ? $("#edit_link", o).hide() : $("#edit_link", o).show()
                        }), $(".inline_action", o).click(function (t) {
                            var n = $(this).dataset("action") == "edit" ? {
                                id: $("#media_selector", o).val()
                            } : {};
                            t.preventDefault(), winkstart.publish("media.popup_edit", n, function (t) {
                                e.setMetadata("media", t.data.id || "null"), s.dialog("close")
                            })
                        }), $("#add", o).click(function () {
                            $("#response_code_input", o).val().match(/^[1-6][0-9]{2}$/) ? (e.setMetadata("code", parseInt($("#response_code_input", o).val(), 10)), e.setMetadata("message", $("#response_message_input", o).val()), $("#media_selector", o).val() && $("#media_selector", o).val() != "null" ? e.setMetadata("media", $("#media_selector", o).val()) : e.deleteMetadata("media"), e.caption = _t("callflow", "sip_code_caption") + $("#response_code_input", o).val(), s.dialog("close")) : winkstart.alert("error", _t("callflow", "please_enter_a_valide_sip_code"))
                        }), s = winkstart.dialog(o, {
                            title: _t("callflow", "response_title"),
                            minHeight: "0",
                            beforeClose: function () {
                                typeof n == "function" && n()
                            }
                        })
                    })
                }
            }
        }), $.extend(e, {
            "resource[]": {
                name: _t("callflow", "resource_name"),
                icon: "resource",
                module: "resources",
                data: {},
                rules: [{
                    type: "quantity",
                    maxSize: "0"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return winkstart.alert(_t("callflow", "this_callflow_is_outdated")), ""
                },
                edit: function (e, t) {}
            },
            "hotdesk[id=*,action=call]": {
                name: _t("callflow", "hot_desking_name"),
                icon: "v_phone",
                module: "hotdesk",
                data: {
                    action: "bridge",
                    id: "null"
                },
                rules: [{
                    type: "quantity",
                    maxSize: "1"
                }],
                isUsable: "true",
                caption: function (e, t) {
                    return e.setMetadata("action", "bridge"), winkstart.alert(_t("callflow", "this_callflow_is_outdated")), ""
                },
                edit: function (e, t) {}
            }
        })
    }
});
