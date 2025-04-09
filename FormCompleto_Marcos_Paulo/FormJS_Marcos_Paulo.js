function mascaraCPF(input) {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function mascaraRG(input) {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1})$/, '$1-$2');
  }

  function mascaraCEP(input) {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d{1,3})$/, '$1-$2');
  }

  function mascaraTelefone(input) {
    input.value = input.value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d{4})$/, '$1-$2');
  }

  function apenasNumeros(input) {
    input.value = input.value.replace(/\D/g, '');
  }

  function apenasLetras(input) {
    input.value = input.value.replace(/[^a-zA-Z áÁéÉíÍóÓúÚçÇ]/g, '');
  }

  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
    return regex.test(email);
  }

  function validarFormulario(e) {
    const form = document.forms[0];
    const email = form["email"].value;
    const cpf = form["cpf"].value;
    const rg = form["rg"].value;
    const cep = form["cep"].value;
    const cep2 = form["cep2"].value;

    if (!validarEmail(email)) {
      alert("Email inválido!");
      form["email"].focus();
      e.preventDefault();
      return false;
    }

    if (cpf.length < 14) {
      alert("CPF incompleto!");
      form["cpf"].focus();
      e.preventDefault();
      return false;
    }

    if (rg.length < 12) {
      alert("RG incompleto!");
      form["rg"].focus();
      e.preventDefault();
      return false;
    }

    if ((cep + cep2).replace(/\D/g, '').length < 8) {
      alert("CEP incompleto!");
      form["cep"].focus();
      e.preventDefault();
      return false;
    }

    return true;
  }

  window.onload = function () {
    const form = document.forms[0];

    // Apenas letras
    ["nome", "sobrenome", "bairro", "cidade", "rua"].forEach(campo => {
      const el = form[campo];
      if (el) {
        el.addEventListener("input", () => apenasLetras(el));
      }
    });

    // Máscaras
    if (form["cpf"]) form["cpf"].addEventListener("input", () => mascaraCPF(form["cpf"]));
    if (form["rg"]) form["rg"].addEventListener("input", () => mascaraRG(form["rg"]));
    if (form["cep"]) form["cep"].addEventListener("input", () => mascaraCEP(form["cep"]));
    if (form["telefone"]) form["telefone"].addEventListener("input", () => mascaraTelefone(form["telefone"]));

    // Apenas números
    ["numero", "dia", "mes", "ano", "cpf2", "cep2"].forEach(campo => {
      const el = form[campo];
      if (el) {
        el.addEventListener("input", () => apenasNumeros(el));
      }
    });

    form.addEventListener("submit", validarFormulario);
  };