class QueryMaker {
  constructor() {
    this.query = ''
  }

  select(...atributos) {
    this.query += `Select ${atributos}`
    return this
  }

  from(table) {
    this.query += `From ${table}`
    return this
  }

  greaterThan(atributo, valor) {
    this.query += `Where ${atributo} >= ${valor}`
    return this
  }
  lessThan(atributo, valor) {
    this.query += `Where ${atributo} <= ${valor}`
    return this
  }
  equals(atributo, valor) {
    this.query += `Where ${atributo} = ${valor}`
    return this
  }
  not(atributo, valor) {
    this.query += `Where not ${atributo} = ${valor}`
    return this
  }

  and(atributo, igualdad, valor) {
    this.query += `And ${atributo} ${igualdad} ${valor}`
  }

  orderBy(atributo) {
    this.query += `Order by ${atributo}`
  }

  make() {
    return this.query
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