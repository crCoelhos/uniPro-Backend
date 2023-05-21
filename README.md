# uniPro-Backend

## (21/05)

Rotas usuario

- (POST) Criacao conta
- (POST) Login
- Logout (implementacao Front)

Models

- Criacao User(Nome, email, senha, contato, cpf, nascimento)
- Cricao Role(Cargo, descricao)
- Criacao User_roles (user ObjectID: ref:User; role ObjectID: ref:role)

## Rota Admin

- (PUT) modificar usuarios [cargos, dados]
- (GET) todos usuarios
