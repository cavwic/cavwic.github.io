import {createServer} from 'vite';

export const createRepositoryTestServer=()=>createServer({
 json:{stringify:true,namedExports:false},
 optimizeDeps:{noDiscovery:true,entries:[]},
 server:{middlewareMode:true,hmr:false,ws:false,watch:null},
 appType:'custom',
 logLevel:'error',
});
