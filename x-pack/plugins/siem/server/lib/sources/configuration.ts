/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { ConfigurationAdapter } from '../configuration';

import { SourceConfigurations, SourcesAdapter } from './index';
import { PartialSourceConfigurations } from './types';

interface ConfigurationWithSources {
  sources?: PartialSourceConfigurations;
}

export class ConfigurationSourcesAdapter implements SourcesAdapter {
  private readonly configuration: ConfigurationAdapter<ConfigurationWithSources>;

  constructor(configuration: ConfigurationAdapter<ConfigurationWithSources>) {
    this.configuration = configuration;
  }

  public async getAll() {
    const sourceConfigurations = (await this.configuration.get()).sources || {
      default: DEFAULT_SOURCE,
    };
    const sourceConfigurationsWithDefault = {
      ...sourceConfigurations,
      default: {
        ...DEFAULT_SOURCE,
        ...(sourceConfigurations.default || {}),
      },
    } as PartialSourceConfigurations;

    return Object.entries(sourceConfigurationsWithDefault).reduce<SourceConfigurations>(
      (result, [sourceId, sourceConfiguration]) =>
        ({
          ...result,
          [sourceId]: {
            ...sourceConfiguration,
            fields: {
              ...DEFAULT_FIELDS,
              ...(sourceConfiguration.fields || {}),
            },
          },
        } as SourceConfigurations),
      {}
    );
  }
}

const DEFAULT_FIELDS = {
  container: 'docker.container.name',
  host: 'beat.hostname',
  message: ['message', '@message'],
  pod: 'kubernetes.pod.name',
  tiebreaker: '_doc',
  timestamp: '@timestamp',
};

const DEFAULT_SOURCE = {
  metricAlias: 'metricbeat-*',
  logAlias: 'filebeat-*',
  auditbeatAlias: 'auditbeat-*',
  packetbeatAlias: 'packetbeat-*',
  winlogbeatAlias: 'winlogbeat-*',
  fields: DEFAULT_FIELDS,
};