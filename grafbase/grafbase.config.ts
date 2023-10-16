import { g, auth, config } from '@grafbase/sdk'

// user Model
const User = g.model('User', {
  name: g.string().length({min: 2, max:20}),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().optional(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  // user has list of projects and can have multiple or none projects
  projects: g.relation(()=> Project).list().optional(),
})

const Project = g.model('Project', {
  title: g.string().length({min: 2, max: 20}),
  description: g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string().search(),
  // project is created by user
  createBy: g.relation(()=> User)


})
export default config({
  schema: g

})
