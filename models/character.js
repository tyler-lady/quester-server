module.exports = (sequelize, DataTypes) => {
    const Character = sequelize.define('character', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        biography: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        race: {
            type: DataTypes.STRING,
            allowNull: false
        },
        class: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        isDead: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    });


    return Character;
}