<<<<<<< HEAD
# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

=======
# Projet_L3
>>>>>>> befd873c90d355017b7dd5db1a77719ba47b05f8
# Mysql
CREATE TABLE user (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  user_birth DATE NOT NULL,
  user_phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
<<<<<<< HEAD

=======
>>>>>>> befd873c90d355017b7dd5db1a77719ba47b05f8
