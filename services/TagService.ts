import axios from 'axios'
import TagsList from '~/models/tagslist.interface'

class TagService {
  private baseUrl?: string = process.env.baseUrl

  public async getTags(): Promise<TagsList> {
    const { data } = await axios.get<TagsList>(`${this.baseUrl}/tags`)
    return data
  }
}

export default new TagService()
