export async function up(knex) {
  const hasColumn = await knex.schema.hasColumn('applications', 'work_modality');

  if (!hasColumn) {
    await knex.schema.alterTable('applications', (table) => {
      table.enu('work_modality', ['HOME_OFFICE', 'HIBRIDO', 'PRESENCIAL']).notNullable().defaultTo('HOME_OFFICE');
    });
  }
}

export async function down(knex) {
  const hasColumn = await knex.schema.hasColumn('applications', 'work_modality');

  if (hasColumn) {
    await knex.schema.alterTable('applications', (table) => {
      table.dropColumn('work_modality');
    });
  }
}
