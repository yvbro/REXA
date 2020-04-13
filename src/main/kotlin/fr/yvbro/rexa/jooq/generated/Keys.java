/*
 * This file is generated by jOOQ.
 */
package fr.yvbro.rexa.jooq.generated;


import fr.yvbro.rexa.jooq.generated.tables.JSchemaVersion;
import fr.yvbro.rexa.jooq.generated.tables.JUser;
import fr.yvbro.rexa.jooq.generated.tables.records.JSchemaVersionRecord;
import fr.yvbro.rexa.jooq.generated.tables.records.JUserRecord;

import org.jooq.TableField;
import org.jooq.UniqueKey;
import org.jooq.impl.Internal;


/**
 * A class modelling foreign key relationships and constraints of tables of 
 * the <code>rexa</code> schema.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class Keys {

    // -------------------------------------------------------------------------
    // IDENTITY definitions
    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------
    // UNIQUE and PRIMARY KEY definitions
    // -------------------------------------------------------------------------

    public static final UniqueKey<JSchemaVersionRecord> SCHEMA_VERSION_PK = UniqueKeys0.SCHEMA_VERSION_PK;
    public static final UniqueKey<JUserRecord> USER_PKEY = UniqueKeys0.USER_PKEY;

    // -------------------------------------------------------------------------
    // FOREIGN KEY definitions
    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------
    // [#1459] distribute members to avoid static initialisers > 64kb
    // -------------------------------------------------------------------------

    private static class UniqueKeys0 {
        public static final UniqueKey<JSchemaVersionRecord> SCHEMA_VERSION_PK = Internal.createUniqueKey(JSchemaVersion.SCHEMA_VERSION, "schema_version_pk", new TableField[] { JSchemaVersion.SCHEMA_VERSION.VERSION }, true);
        public static final UniqueKey<JUserRecord> USER_PKEY = Internal.createUniqueKey(JUser.USER, "user_pkey", new TableField[] { JUser.USER.EMAIL }, true);
    }
}
