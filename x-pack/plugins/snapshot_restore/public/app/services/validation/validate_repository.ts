/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { textService } from '../text';
import {
  Repository,
  RepositoryType,
  FSRepository,
  ReadonlyRepository,
  S3Repository,
  GCSRepository,
  HDFSRepository,
} from '../../../../common/types';
import { REPOSITORY_TYPES } from '../../../../common/constants';

export interface RepositoryValidation {
  isValid: boolean;
  errors: {
    name?: string[];
    type?: string[];
    settings?: RepositorySettingsValidation;
  };
}

export interface RepositorySettingsValidation {
  [key: string]: string[];
}

export const validateRepository = (repository: Repository): RepositoryValidation => {
  const { name, type, settings } = repository;
  const { i18n } = textService;
  const validation: RepositoryValidation = {
    isValid: true,
    errors: {},
  };
  const settingsValidation = validateRepositorySettings(type, settings);

  if (Object.keys(settingsValidation).length) {
    validation.errors.settings = settingsValidation;
  }

  if (isStringEmpty(name)) {
    validation.errors.name = [
      i18n.translate('xpack.snapshotRestore.repositoryValidation.nameRequired', {
        defaultMessage: 'Repository name is required',
      }),
    ];
  }

  if (Object.keys(validation.errors).length) {
    validation.isValid = false;
  }

  return validation;
};

const isStringEmpty = (str: string): boolean => {
  return str ? !Boolean(str.trim()) : true;
};

const validateRepositorySettings = (
  type: RepositoryType,
  settings: Repository['settings']
): RepositorySettingsValidation => {
  switch (type) {
    case REPOSITORY_TYPES.fs:
      return validateFSRepositorySettings(settings);
    case REPOSITORY_TYPES.url:
      return validateReadonlyRepositorySettings(settings);
    case REPOSITORY_TYPES.source:
      return validateRepositorySettings(settings.delegate_type, settings);
    case REPOSITORY_TYPES.s3:
      return validateS3RepositorySettings(settings);
    case REPOSITORY_TYPES.gcs:
      return validateGCSRepositorySettings(settings);
    case REPOSITORY_TYPES.hdfs:
      return validateHDFSRepositorySettings(settings);
    // No validation on settings needed for azure (all settings are optional)
    default:
      return {};
  }
};

const validateFSRepositorySettings = (
  settings: FSRepository['settings']
): RepositorySettingsValidation => {
  const i18n = textService.i18n;
  const validation: RepositorySettingsValidation = {};
  const { location } = settings;
  if (isStringEmpty(location)) {
    validation.location = [
      i18n.translate('xpack.snapshotRestore.repositoryValidation.locationRequired', {
        defaultMessage: 'Location is required',
      }),
    ];
  }
  return validation;
};

const validateReadonlyRepositorySettings = (
  settings: ReadonlyRepository['settings']
): RepositorySettingsValidation => {
  const i18n = textService.i18n;
  const validation: RepositorySettingsValidation = {};
  const { url } = settings;
  if (isStringEmpty(url)) {
    validation.url = [
      i18n.translate('xpack.snapshotRestore.repositoryValidation.urlRequired', {
        defaultMessage: 'URL is required',
      }),
    ];
  }
  return validation;
};

const validateS3RepositorySettings = (
  settings: S3Repository['settings']
): RepositorySettingsValidation => {
  const i18n = textService.i18n;
  const validation: RepositorySettingsValidation = {};
  const { bucket } = settings;
  if (isStringEmpty(bucket)) {
    validation.bucket = [
      i18n.translate('xpack.snapshotRestore.repositoryValidation.bucketRequired', {
        defaultMessage: 'Bucket is required',
      }),
    ];
  }
  return validation;
};

const validateGCSRepositorySettings = (
  settings: GCSRepository['settings']
): RepositorySettingsValidation => {
  const i18n = textService.i18n;
  const validation: RepositorySettingsValidation = {};
  const { bucket } = settings;
  if (isStringEmpty(bucket)) {
    validation.bucket = [
      i18n.translate('xpack.snapshotRestore.repositoryValidation.bucketRequired', {
        defaultMessage: 'Bucket is required',
      }),
    ];
  }
  return validation;
};

const validateHDFSRepositorySettings = (
  settings: HDFSRepository['settings']
): RepositorySettingsValidation => {
  const i18n = textService.i18n;
  const validation: RepositorySettingsValidation = {};
  const { uri, path } = settings;
  if (isStringEmpty(uri)) {
    validation.uri = [
      i18n.translate('xpack.snapshotRestore.repositoryValidation.uriRequired', {
        defaultMessage: 'URI is required',
      }),
    ];
  }
  if (isStringEmpty(path)) {
    validation.path = [
      i18n.translate('xpack.snapshotRestore.repositoryValidation.pathRequired', {
        defaultMessage: 'Path is required',
      }),
    ];
  }
  return validation;
};