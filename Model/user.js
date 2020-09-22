module.exports = (sequelize, DataTypes) => {

    const Student = sequelize.define('User', {
    // Model attributes are defined here
    student_id: {
        type: Sequelize.DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,

    },
    password: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE
    },
    join_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
    }, {});

    // Student.associate = function(models) {
    //   // associations can be defined here
    // };
    return Student;
};