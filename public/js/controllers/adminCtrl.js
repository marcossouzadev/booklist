angular.module('Book').controller('adminCtrl', function($scope, contatosAPI, config, jwtHelper){
  $scope.usuario_atual = sessionStorage.getItem('usuario_atual');
  $scope.info = config.info;
  $scope.goHome = function(){
    return window.location.assign(config.baseUrl +'/admin');
  }
  //Retorna lista de contatos
  var getContatos = function(){
    contatosAPI.getContatos()
    .then(function(res){
      $scope.contatos = res.data;
    })
    .catch(function(res){
      if(res.status === 401){
        alert("Você não tem permissão para acessar!!");
        window.location.assign(config.baseUrl + '/login');
      }
    });
  };

  //adiciona contato
  $scope.addContato = function(contato){
    if(contato){
      contatosAPI.addContato(contato)
      .then(function(data){
        if(data.data.error){
          if(data.data.error.name === "SequelizeUniqueConstraintError"){
            alert("Este login já está em uso. Tente outro!");
          }
        }else{
          alert("Contato adiconado com sucesso!");
          window.location.assign(config.baseUrl + '/admin/add');
        }
      })
      .catch(function(error){
        if(error.status === 401){
          alert("Você não está logado!!");
        };
      })
    };
  };

  //Redireciona para pagina de editar passando id
  $scope.editar = function(id){
    sessionStorage.setItem('target_id', id);
    sessionStorage.setItem('page', 'editar');
    window.location.assign(config.baseUrl + '/admin/editar');
  }
  var editarContato = function(){
    var id = sessionStorage.getItem('target_id');
    var page = sessionStorage.getItem('page');
    if(id){
      contatosAPI.getContatoById(id)
      .then(function(data){
        $scope.editarContato = data.data;
      })
      .catch(function(error){
        alert("Contato não localizado!! ERRO# " + error);
      });
    };
  };
  //Salvar contato alterado
  $scope.atualizarContato = function(contato, id){
    if(id && contato != null){
      contatosAPI.atualizaContato(contato, id)
      .then(function(data){
        if(data.data.error){
          if(data.data.error.name === "SequelizeUniqueConstraintError"){
            alert("Este login já está em uso. Tente outro!");
          }
        }else{
          alert("Contato atualizado com sucesso!");
          sessionStorage.removeItem('target_id');
          sessionStorage.removeItem('page');
          window.location.assign(config.baseUrl + '/admin');
        }
      })
      .catch(function(error){
        alert("Erro ao tentar atualizar contato!! ERROR #" + error);
      })
    };
  };

  //Verifica se pagina atual é editar e carrega o contato
  if(sessionStorage.getItem('page') === "editar"){
    editarContato();
  };

  //Remove contato
  $scope.removeContato = function(id, name){
    if(id && confirm("Deseja realmente deletar " + name +" ?") === true){
      contatosAPI.removeContato(id)
      .then(function(res){
        alert("Contato removido com sucesso!");
        getContatos();
      })
      .catch(function(res){
        alert(res.error)
      })
    };
  };

  //Busca usuario no banco e Atualiza senha
  $scope.alterarSenha = function(oldPass, newPass, rePass){
    if(newPass === rePass){
      var token = jwtHelper.decodeToken(sessionStorage.getItem('token_id'));
      if(token.id){
        contatosAPI.getContatoById(token.id)
        .then(function(user){
          var usr = user.data;
          if(usr.password === oldPass){
            usr.password = newPass;
            contatosAPI.atualizaContato(usr, token.id)
            .then(function(){
              sessionStorage.clear();
              alert("Senha alterada com sucesso!");
              window.location.assign(config.baseUrl + '/login');
            })
            .catch(function(err){
              console.log(err);
            });
          }else{
            alert("Sua senha atual não confere!!")
          }
        })
        .catch(function(err){
          console.log(err);
        });
      }
    }else{
      alert("Nova senha e confirmação de senha não estão iguais!");
    }
  }

  //Faz logout
  $scope.logout = function(){
    sessionStorage.clear();
    window.location.assign(config.baseUrl + '/login');
  }

  //Invoca função para listar contatos
  getContatos();
});
