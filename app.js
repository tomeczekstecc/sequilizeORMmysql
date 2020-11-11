const e = require('express')
const express = require('express')
const {
  sequelize,
  User,
  Post
} = require('./models')

const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
  const {
    name,
    email,
    role
  } = req.body

  try {
    const user = await User.create({
      name,
      email,
      role

    })

    return res.status(200).json({
      status: 'success',
      message: 'Successfully created a user',
      messagePL: 'Utwotzuno nowego użytkownika',
      data: user
    })
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      count: err.errors.length,
      errors: err.errors.map(e => {
        return {
          message: e.message,
          path: e.path
        }
      })

    })

  }
})


app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    return res.status(200).json({
      status: 'success',
      message: 'Successfully fetched users',
      messagePL: 'Pomyśnie pobrano dane użytkowników',
      count: users.length,
      data: users
    })

  } catch (error) {
    console.log(error);
  }
})


app.get('/users/:id', async (req, res) => {
  const {
    id
  } = req.params

  try {
    const user = await User.findOne({
      where: {
        id: id
      },
      include: 'posts'
    })
    return res.status(200).json({
      status: 'success',
      message: 'Successfully fetched user',
      messagePL: 'Pomyśnie pobrano dane użytkownika',
      count: user.length,
      data: user
    })

  } catch (error) {
    console.log(error);
  }
})


app.delete('/users/:id', async (req, res) => {
  const {
    id
  } = req.params

  console.log(id);

  try {

    const user = await User.findOne({
      where: {
        id
      }
    })
    await user.destroy()

    return res.status(200).json({
      status: 'success',
      message: 'Successfully deleted user',
      messagePL: 'Pomyśnie usunięto użytkownika',
      count: user.length,
      data: user
    })
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      count: err.message
    })
  }
})


app.put('/users/:id', async (req, res) => {
  const {
    id
  } = req.params
  const {
    name,
    email,
    role
  } = req.body

  try {
    const user = await User.findOne({
      where: {
        id
      }
    })


    user.name = name,
      user.email = email,
      user.role = role


    await user.save()

    return res.status(200).json({
      status: 'success',
      message: 'Successfully updated a user',
      messagePL: 'Pomyślnie zaktualizowano dane użytkownika',
      data: user
    })
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      errors: err.errors

    })

  }
})


app.post('/posts', async (req, res) => {
  const {
    username,
    body
  } = req.body

  const user = await User.findOne({
    where: {
      name: username
    }
  })


  try {
    const post = await Post.create({
      body,
      userId: user.id
    })

    return res.status(200).json({
      status: 'success',
      message: 'Successfully created a post',
      messagePL: 'Utwotrzono nowy wpis',
      count: post.length,
      data: post
    })
  } catch (err) {

    console.log(err)
  }
})


// get a poost and include user info
app.get('/posts', async (req, res) => {
  try {
    // const posts = await Post.findAll({include: [User]})
    //orr alias `User` to `user`
    const posts = await Post.findAll({
      include: [{
        model: User,
        as: 'user'
      }]
    })
    return res.status(200).json({
      status: 'success',
      message: 'Successfully fetched all posts',
      messagePL: 'Pomyśnie pobrano wszystkie wpisy',
      count: posts.length,
      data: posts
    })

  } catch (error) {
    console.log(error);
  }
})


app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll()
    return res.status(200).json({
      status: 'success',
      message: 'Successfully fetched all posts',
      messagePL: 'Pomyśnie pobrano wszystkie wpisy',
      count: posts.length,
      data: posts
    })

  } catch (error) {
    console.log(error);
  }
})


app.listen(5000, async () => {
  console.log(`
  ############################
  Server running on port 5000
  ############################
  `);
  await sequelize.authenticate();
  console.log(`
  --------------------
   Database connected
  --------------------
  `);
})