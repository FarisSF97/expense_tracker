/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable("pengeluaran", {
        id : {
            type : "SERIAL",
            primaryKey : true
        },
        description : {
            type: "string",
            notNull : true
        },
        amount : {
            type : "INT",
            notNull: true
        }
    });

    // Add dummy data
    pgm.sql("INSERT INTO pengeluaran (description, amount) VALUES ('beli makanan', 4000)");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("pengeluaran")
};
