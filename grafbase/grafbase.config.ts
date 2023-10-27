import { g, auth, config } from "@grafbase/sdk";

// user Model
//@ts-ignore
const User = g
  .model("User", {
    name: g.string().length({ min: 2, max: 20 }),
    email: g.string().unique(),
    avatarUrl: g.url(),
    description: g.string().optional(),
    githubUrl: g.url().optional(),
    linkedinUrl: g.url().optional(),
    // user has list of projects and can have multiple or none projects
    projects: g
      .relation(() => Project)
      .list()
      .optional(),
  })
  .auth((rules) => {
    rules.public().read();
  });
//Users are publicly read. everybody can read our users

//@ts-ignore
const Project = g
  .model("Project", {
    title: g.string().length({ min: 2, max: 20 }),
    description: g.string(),
    image: g.url(),
    liveSiteUrl: g.url(),
    githubUrl: g.url(),
    category: g.string().search(),
    // project is created by user
    createdBy: g.relation(() => User),
  })
  .auth((rules) => {
    rules.public().read(), rules.private().create().delete().update();
  });
//any users can read the projects
// but not everyone can create, delete, and update

const jwt = auth.JWT({
  issuer: "grafbase",
  // go to https://www.cryptool.org/en/cto/openssl
  // use this command to generate secret
  // openssl rand -base64 32 then paste to grafbase/.env
  secret: g.env("NEXTAUTH_SECRET"),
});
export default config({
  schema: g,
  //connecting jwt
  auth: {
    // provider is jwt
    providers: [jwt],
    // all functionalities of app to be private
    rules: (rules) => rules.private(),
  },
});
