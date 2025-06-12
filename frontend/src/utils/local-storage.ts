export function setValue<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value)

    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(
      `Erro ao salvar no localStorage para a chave "${key}":`,
      error
    )
  }
}

export function getValue<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key)
    if (!item) return null

    try {
      return JSON.parse(item) as T
    } catch {
      return item as unknown as T
    }
  } catch (error) {
    console.error(
      `Erro ao recuperar do localStorage para a chave "${key}":`,
      error
    )
    return null
  }
}

export function removeValue(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(
      `Erro ao remover do localStorage para a chave "${key}":`,
      error
    )
  }
}
