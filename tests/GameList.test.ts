import { mount } from '@vue/test-utils'
import GameList from '@/components/GameList.vue'
import axios from 'axios'
import { vi, describe, it, expect } from 'vitest'


vi.mock('axios')
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>
}

describe('GameList.vue', () => {
  it('fetches and displays games', async () => {
    mockedAxios.get = vi.fn().mockResolvedValueOnce({
      data: {
        results: [
          { id: 1, name: 'The Witcher 3', background_image: 'test.jpg', released: '2015' },
          { id: 2, name: 'Cyberpunk 2077', background_image: 'test2.jpg', released: '2020' },
        ],
      },
    })

    const wrapper = mount(GameList)

   
    await new Promise(resolve => setTimeout(resolve, 0))

    const gameCards = wrapper.findAll('h2')
    expect(gameCards.length).toBe(2)
    expect(gameCards[0].text()).toContain('The Witcher 3')
    expect(gameCards[1].text()).toContain('Cyberpunk 2077')
  })
})
