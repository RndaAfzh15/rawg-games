import { vi } from 'vitest'
import { config } from '@vue/test-utils'

vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
})


config.global.stubs = {
  'router-link': { template: '<a><slot /></a>' },
  'router-view': { template: '<div></div>' },
}
