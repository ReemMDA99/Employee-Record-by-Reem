---- SEED DEPARTMENT -----

INSERT INTO department (name)
    VALUES 
        ("Marketing"),
        ("Finance"),
        ("HR"),
        ("Sales"),
        ("Customer-Service"),
        ("Administrative");
        
    SELECT * FROM DEPARTMENT;

---- SEED ROLE -----

INSERT INTO role (title, salary, department_id)
    VALUES 
        ("Marketing manager", 90000, 1),
        ("Marketing cordinator", 70000, 1),
        ("Co-op", 60000, 1),
        ("Finanace manager", 100000, 2),
        ("Business analyst", 70000, 2),
        ("Acoountant", 66000, 2),
        ("HR manager", 90000, 3),
        ("Recuriter", 11000, 3),
        ("Sales rep", 85000, 4),
        ("Sales manager", 120000, 4),
        ("Customer-service rep", 55000, 5),
        ("Customer care", 40000, 5),
        ("Administartion manager", 75000, 6),
        ("Payroll administrator", 60000, 6);

    SELECT * FROM ROLE;

---- SEED EMPLOYEE -----

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES 
        ("Reem", "Ahmed", 1, NULL),
        ("John", "Peter", 2, 1),
        ("Max", "Well", 4, 2),
        ("Sam", "Dan", 3, 3),
        ("Mike", "Man", 1, 2),
        ("Robert", "Brown", 5, 4),
        ("Sid", "Bake", 6, 5),
        ("Kool", "Girl", 4, 6);

    
    SELECT * FROM employee;