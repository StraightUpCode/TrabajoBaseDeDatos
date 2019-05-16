class QueryMaker {
  constructor() {
    this.query = ''
  }

  select(...atributos) {
    this.query += `Select ${atributos} `
    return this
  }

  from(table) {
    this.query += `From ${table} `
    return this
  }

  greaterThan(atributo, valor) {
    this.query += `Where ${atributo} >= ${valor} `
    return this
  }
  lessThan(atributo, valor) {
    this.query += `Where ${atributo} <= ${valor} `
    return this
  }
  equals(atributo, valor) {
    this.query += `Where ${atributo} = ${valor} `
    return this
  }
  where(atributo) {
    this.query += `Where ${atributo} `
    return this
  }
  starts(string) {
    this.query += `LIKE '${string}%' `
    return this
  }
  includes(string) {
    this.query += `Like '%${string}%' `
    return this
  }
  ends(string) {
    this.query += `Like '%${string}' `
    return this
  }
  not(atributo, valor) {
    this.query += `Where not ${atributo} = ${valor} `
    return this
  }

  andEquals(atributo, valor) {
    this.query += `And ${atributo} = ${valor} `
    return this
  }

  orderBy(atributo) {
    this.query += `Order by ${atributo} `
    return this
  }

  innerJoin(tablaAUnir, atributo, igualdad, atributo2) {
    this.query += `inner join ${tablaAUnir} on ${atributo} ${igualdad} ${atributo2} `
    return this
  }

  make() {
    let finalQuery = this.query + ";"
    this.query = ''
    return finalQuery
  }

  insert(tabla, objeto) {
    const atributos = Object.keys(objeto).join()
    const values = Object.values(objeto).map(el => typeof el == "string" ? `"${el}"` : el).join()
    console.log(atributos)
    console.log(values)
    this.query += `Insert into ${tabla} (${atributos}) values(${values})`
    return this
  }
}

module.exports = QueryMaker