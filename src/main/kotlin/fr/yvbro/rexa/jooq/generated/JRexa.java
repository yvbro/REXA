/*
 * This file is generated by jOOQ.
 */
package fr.yvbro.rexa.jooq.generated;


import fr.yvbro.rexa.jooq.generated.tables.JSchemaVersion;
import fr.yvbro.rexa.jooq.generated.tables.JUser;
import fr.yvbro.rexa.jooq.generated.tables.JUserSettings;
import org.jooq.Catalog;
import org.jooq.Table;
import org.jooq.impl.SchemaImpl;

import java.util.Arrays;
import java.util.List;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class JRexa extends SchemaImpl {

    private static final long serialVersionUID = -1236355590;

    /**
     * The reference instance of <code>rexa</code>
     */
    public static final JRexa REXA = new JRexa();

    /**
     * The table <code>rexa.schema_version</code>.
     */
    public final JSchemaVersion SCHEMA_VERSION = JSchemaVersion.SCHEMA_VERSION;

    /**
     * The table <code>rexa.user</code>.
     */
    public final JUser USER = JUser.USER;

    /**
     * The table <code>rexa.user_settings</code>.
     */
    public final JUserSettings USER_SETTINGS = JUserSettings.USER_SETTINGS;

    /**
     * No further instances allowed
     */
    private JRexa() {
        super("rexa", null);
    }


    @Override
    public Catalog getCatalog() {
        return DefaultCatalog.DEFAULT_CATALOG;
    }

    @Override
    public final List<Table<?>> getTables() {
        return Arrays.<Table<?>>asList(
            JSchemaVersion.SCHEMA_VERSION,
            JUser.USER,
            JUserSettings.USER_SETTINGS);
    }
}
