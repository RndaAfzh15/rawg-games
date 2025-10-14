import { mount } from '@vue/test-utils'
import SearchBar from '../src/components/SearchBar.vue'

test('emits search event when user types', async () => {
  const wrapper = mount(SearchBar)
  const input = wrapper.find('input')
  await input.setValue('Zelda')
  expect(wrapper.emitted('search')).toBeTruthy()
})
