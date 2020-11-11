## SOURCE:
https://www.youtube.com/watch?v=3qlnR9hK-lQ&t=55s


### tags
postgres sequilizeORM ORM mysql nodejs-mysql sql

#### install cli
npm i -g sequelize-cli

#### init sequelizeORM config
sequelize init

#### create db using cli
sequelize db:create

#### create model for table
sequelize model:generate --name User --attributes name:string,email:string,role:string

#### generate migrations
sequelize db:migrate

### include users info to post

```js
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({include: [User]})
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
```
