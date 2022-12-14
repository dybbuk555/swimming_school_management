export default (app) => {
  app.post(
    `/tenant/:tenantId/pool`,
    require('./poolCreate').default,
  );
  app.put(
    `/tenant/:tenantId/pool/:id`,
    require('./poolUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/pool/import`,
    require('./poolImport').default,
  );
  app.delete(
    `/tenant/:tenantId/pool`,
    require('./poolDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/pool/autocomplete`,
    require('./poolAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/pool`,
    require('./poolList').default,
  );
  app.get(
    `/tenant/:tenantId/pool/:id`,
    require('./poolFind').default,
  );
};
