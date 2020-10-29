/*
 * This file is generated by jOOQ.
 */
package fr.yvbro.rexa.jooq.generated.tables.records;


import fr.yvbro.rexa.jooq.generated.tables.JUserRole;

import java.util.UUID;

import org.jooq.Field;
import org.jooq.Record2;
import org.jooq.Row2;
import org.jooq.impl.TableRecordImpl;


/**
 * This class is generated by jOOQ.
 */
@SuppressWarnings({ "all", "unchecked", "rawtypes" })
public class JUserRoleRecord extends TableRecordImpl<JUserRoleRecord> implements Record2<UUID, UUID> {

    private static final long serialVersionUID = 167958315;

    /**
     * Setter for <code>rexa.user_role.user_id</code>.
     */
    public void setUserId(UUID value) {
        set(0, value);
    }

    /**
     * Getter for <code>rexa.user_role.user_id</code>.
     */
    public UUID getUserId() {
        return (UUID) get(0);
    }

    /**
     * Setter for <code>rexa.user_role.role_id</code>.
     */
    public void setRoleId(UUID value) {
        set(1, value);
    }

    /**
     * Getter for <code>rexa.user_role.role_id</code>.
     */
    public UUID getRoleId() {
        return (UUID) get(1);
    }

    // -------------------------------------------------------------------------
    // Record2 type implementation
    // -------------------------------------------------------------------------

    @Override
    public Row2<UUID, UUID> fieldsRow() {
        return (Row2) super.fieldsRow();
    }

    @Override
    public Row2<UUID, UUID> valuesRow() {
        return (Row2) super.valuesRow();
    }

    @Override
    public Field<UUID> field1() {
        return JUserRole.USER_ROLE.USER_ID;
    }

    @Override
    public Field<UUID> field2() {
        return JUserRole.USER_ROLE.ROLE_ID;
    }

    @Override
    public UUID component1() {
        return getUserId();
    }

    @Override
    public UUID component2() {
        return getRoleId();
    }

    @Override
    public UUID value1() {
        return getUserId();
    }

    @Override
    public UUID value2() {
        return getRoleId();
    }

    @Override
    public JUserRoleRecord value1(UUID value) {
        setUserId(value);
        return this;
    }

    @Override
    public JUserRoleRecord value2(UUID value) {
        setRoleId(value);
        return this;
    }

    @Override
    public JUserRoleRecord values(UUID value1, UUID value2) {
        value1(value1);
        value2(value2);
        return this;
    }

    // -------------------------------------------------------------------------
    // Constructors
    // -------------------------------------------------------------------------

    /**
     * Create a detached JUserRoleRecord
     */
    public JUserRoleRecord() {
        super(JUserRole.USER_ROLE);
    }

    /**
     * Create a detached, initialised JUserRoleRecord
     */
    public JUserRoleRecord(UUID userId, UUID roleId) {
        super(JUserRole.USER_ROLE);

        set(0, userId);
        set(1, roleId);
    }
}
