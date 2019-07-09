import axios from 'axios'
import TagsList from '~/models/tagslist.interface'

class TagService {
  private baseUrl?: string = process.env.baseUrl

  public async getTags(): Promise<TagsList> {
    const response = await axios.get<TagsList>(`${this.baseUrl}/tags`)
    return response.data
  }
}

export default new TagService()
