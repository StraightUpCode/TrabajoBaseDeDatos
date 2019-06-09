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
  between(inicio, fin) {
    this.query += `BETWEEN ${inicio} AND ${fin} `
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
  andNotEquals(atributo, valor) {
    this.query += `And not ${atributo} = ${valor} `
    return this
  }
  or(tablaAUnir) {
    this.query += `OR ${tablaAUnir} `
    return this
  }

  orderBy(atributo) {
    this.query += `Order by ${atributo} `
    return this
  }
  leftJoin(tablaAUnir) {
    this.query += `left join ${tablaAUnir} `
    return this
  }
  rightJoin(tablaAUnir) {
    this.query += `right join ${tablaAUnir} `
    return this
  }

  innerJoin(tablaAUnir) {
    this.query += `inner join ${tablaAUnir} `
    return this
  }
  onEquals(atributo, atributo2) {
    this.query += `on ${atributo} = ${atributo2} `
    return this
  }

  make() {
    let finalQuery = this.query + ";"
    this.query = ''
    return finalQuery
  }

  insert(tabla, objeto) {
    console.log(objeto)
    const atributos = Object.keys(objeto).join()
    const values = Object.values(objeto).map(el => typeof el == "string" ? `"${el}"` : el).join()
    this.query += `Insert into ${tabla} (${atributos}) values(${values})`
    return this
  }

  update(tabla, objeto, atributoClave, id) {
    this.query += `Update ${tabla} SET`
    for (const key in objeto) {
      this.query += typeof objeto[key] == 'string' ? ` ${key}="${objeto[key]}" ` : ` ${key}=${objeto[key]} `
    }
    this.query += ` where ${atributoClave} = ${id} `
    return this
  }
}

module.exports = QueryMaker