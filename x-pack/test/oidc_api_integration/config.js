/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { resolve } from 'path';
export default async function ({ readConfigFile }) {
  const kibanaAPITestsConfig = await readConfigFile(require.resolve('../../../test/api_integration/config.js'));
  const xPackAPITestsConfig = await readConfigFile(require.resolve('../api_integration/config.js'));
  const plugin = resolve(__dirname, '../plugin_api_integration/plugins/oidc_provider');
  const kibanaPort = xPackAPITestsConfig.get('servers.kibana.port');
  const jwksPath = resolve(__dirname, './fixtures/jwks.json');


  return {
    testFiles: [require.resolve('./apis')],
    servers: xPackAPITestsConfig.get('servers'),
    services: {
      chance: kibanaAPITestsConfig.get('services.chance'),
      es: kibanaAPITestsConfig.get('services.es'),
      supertestWithoutAuth: xPackAPITestsConfig.get('services.supertestWithoutAuth'),
    },
    junit: {
      reportName: 'X-Pack OpenID Connect API Integration Tests',
    },

    esTestCluster: {
      ...xPackAPITestsConfig.get('esTestCluster'),
      serverArgs: [
        ...xPackAPITestsConfig.get('esTestCluster.serverArgs'),
        'xpack.security.authc.token.enabled=true',
        'xpack.security.authc.token.timeout=15s',
        'xpack.security.authc.realms.oidc.oidc1.order=0',
        `xpack.security.authc.realms.oidc.oidc1.op.name=test-oidc`,
        `xpack.security.authc.realms.oidc.oidc1.rp.client_id=0oa8sqpov3TxMWJOt356`,
        `xpack.security.authc.realms.oidc.oidc1.rp.response_type=code`,
        `xpack.security.authc.realms.oidc.oidc1.rp.redirect_uri=http://localhost:${kibanaPort}/api/security/v1/oidc`,
        `xpack.security.authc.realms.oidc.oidc1.op.authorization_endpoint=https://test-op.elastic.co/oauth2/v1/authorize`,
        `xpack.security.authc.realms.oidc.oidc1.op.endsession_endpoint=https://test-op.elastic.co/oauth2/v1/endsession`,
        `xpack.security.authc.realms.oidc.oidc1.op.token_endpoint=http://localhost:${kibanaPort}/api/oidc_provider/token_endpoint`,
        `xpack.security.authc.realms.oidc.oidc1.op.userinfo_endpoint=http://localhost:${kibanaPort}/api/oidc_provider/userinfo_endpoint`,
        `xpack.security.authc.realms.oidc.oidc1.op.issuer=https://test-op.elastic.co`,
        `xpack.security.authc.realms.oidc.oidc1.op.jwkset_path=${jwksPath}`,
        `xpack.security.authc.realms.oidc.oidc1.claims.principal=sub`
      ],
    },

    kbnTestServer: {
      ...xPackAPITestsConfig.get('kbnTestServer'),
      serverArgs: [
        ...xPackAPITestsConfig.get('kbnTestServer.serverArgs'),
        `--plugin-path=${plugin}`,
        '--optimize.enabled=false',
        '--server.xsrf.whitelist=[\"/api/security/v1/oidc\", \"/api/oidc_provider/token_endpoint\", ' +
        '\"/api/oidc_provider/userinfo_endpoint\"]',
        '--xpack.security.authProviders=[\"oidc\"]',
        '--xpack.security.auth.oidc.realm=\"oidc1\"',
      ],
    },
  };
}
