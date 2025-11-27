(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/supabase/unified.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ClientType",
    ()=>ClientType,
    "SassClient",
    ()=>SassClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
var ClientType = /*#__PURE__*/ function(ClientType) {
    ClientType["SERVER"] = "server";
    ClientType["SPA"] = "spa";
    return ClientType;
}({});
class SassClient {
    async loginEmail(email, password) {
        return this.client.auth.signInWithPassword({
            email,
            password
        });
    }
    async registerEmail(email, password, metadata) {
        const result = await this.client.auth.signUp({
            email,
            password,
            options: {
                data: metadata || {},
                emailRedirectTo: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SITE_URL, '/api/auth/callback')
            }
        });
        return result;
    }
    async updateUser(data) {
        return this.client.auth.updateUser(data);
    }
    async exchangeCodeForSession(code) {
        return this.client.auth.exchangeCodeForSession(code);
    }
    async resendVerificationEmail(email) {
        return this.client.auth.resend({
            email,
            type: 'signup'
        });
    }
    async logout() {
        const { error } = await this.client.auth.signOut({
            scope: 'local'
        });
        if (error) throw error;
        if (this.clientType === "spa") {
            window.location.href = '/auth/login';
        }
    }
    getSupabaseClient() {
        return this.client;
    }
    constructor(client, clientType){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "client", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "clientType", void 0);
        this.client = client;
        this.clientType = clientType;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSPAClient",
    ()=>createSPAClient,
    "createSPASassClient",
    ()=>createSPASassClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$unified$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/unified.ts [app-client] (ecmascript)");
;
;
function createSPAClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(("TURBOPACK compile-time value", "http://159.69.47.241:8000"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE"));
}
async function createSPASassClient() {
    const client = createSPAClient();
    return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$unified$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SassClient"](client, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$unified$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClientType"].SPA);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/context/GlobalContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/lib/context/GlobalContext.tsx
__turbopack_context__.s([
    "GlobalProvider",
    ()=>GlobalProvider,
    "useGlobal",
    ()=>useGlobal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
const GlobalContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function GlobalProvider(param) {
    let { children } = param;
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // Add this
    const loadUserData = async ()=>{
        try {
            setLoading(true);
            const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSPASassClient"])();
            const client = supabase.getSupabaseClient();
            // Get user data
            const { data: { user } } = await client.auth.getUser();
            if (user) {
                var _user_user_metadata, _user_user_metadata1, _user_user_metadata2;
                // Get user profile data
                const { data: profile, error: profileError } = await client.from('users_profile').select('*').eq('id', user.id).single();
                if (profileError && profileError.code !== 'PGRST116') {
                    console.error('Error loading user profile:', profileError);
                }
                var _user_user_metadata_user_type, _user_user_metadata_first_name, _user_user_metadata_last_name;
                setUser({
                    // Auth fields
                    email: user.email,
                    id: user.id,
                    created_at: new Date(user.created_at),
                    user_type: (_user_user_metadata_user_type = (_user_user_metadata = user.user_metadata) === null || _user_user_metadata === void 0 ? void 0 : _user_user_metadata.user_type) !== null && _user_user_metadata_user_type !== void 0 ? _user_user_metadata_user_type : null,
                    first_name: (_user_user_metadata_first_name = (_user_user_metadata1 = user.user_metadata) === null || _user_user_metadata1 === void 0 ? void 0 : _user_user_metadata1.first_name) !== null && _user_user_metadata_first_name !== void 0 ? _user_user_metadata_first_name : '',
                    last_name: (_user_user_metadata_last_name = (_user_user_metadata2 = user.user_metadata) === null || _user_user_metadata2 === void 0 ? void 0 : _user_user_metadata2.last_name) !== null && _user_user_metadata_last_name !== void 0 ? _user_user_metadata_last_name : ''
                });
            } else {
                // User is not logged in - this is a valid state, not an error
                setUser(null);
            }
        } catch (error) {
            console.error('Error loading data:', error);
            setUser(null);
        } finally{
            setLoading(false);
        }
    };
    const updateUser = (updatedUser)=>{
        setUser((prev)=>prev ? {
                ...prev,
                ...updatedUser
            } : null);
    };
    const refreshUser = async ()=>{
        await loadUserData();
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GlobalProvider.useEffect": ()=>{
            loadUserData();
        }
    }["GlobalProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GlobalContext.Provider, {
        value: {
            loading,
            user,
            updateUser,
            refreshUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/context/GlobalContext.tsx",
        lineNumber: 93,
        columnNumber: 9
    }, this);
}
_s(GlobalProvider, "Vgo8afMO04009mNjPCvHgLGkrLg=");
_c = GlobalProvider;
const useGlobal = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
};
_s1(useGlobal, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "GlobalProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_lib_1fad1928._.js.map