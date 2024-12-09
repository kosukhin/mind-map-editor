declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (...args: unknown[]) => unknown;
  }
}
