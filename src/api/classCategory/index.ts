export default (app) => {
  app.post(
    `/tenant/:tenantId/class-category`,
    require('./classCategoryCreate').default,
  );
  app.put(
    `/tenant/:tenantId/class-category/:id`,
    require('./classCategoryUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/class-category/import`,
    require('./classCategoryImport').default,
  );
  app.delete(
    `/tenant/:tenantId/class-category`,
    require('./classCategoryDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/class-category/autocomplete`,
    require('./classCategoryAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/class-category`,
    require('./classCategoryList').default,
  );
  app.get(
    `/tenant/:tenantId/class-category/:id`,
    require('./classCategoryFind').default,
  );
};
