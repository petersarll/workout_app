const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

function post(parent, args, context, info) {
  const userId = getUserId(context)
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  })
}

function stats(parent, args, context, info) {
  const userId = getUserId(context)
  return context.prisma.createStat({
    deadlift: args.deadlift,
    squat: args.squat,
    benchpress: args.benchpress,
    shoulderpress: args.shoulderpress,
    sumopull: args.sumopull,
    frontsquat: args.frontsquat,
    postedBy: { connect: { id: userId } }
  })
}

async function signup(parent, args, context, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10)
  // 2
  const user = await context.prisma.createUser({ ...args, password })
  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  // 4
  return {
    token,
    user
  }
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user({ email: args.email })
  if (!user) {
    throw new Error('No such user found')
  }
  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  if (!token) {
    throw new Error('We are having problems receiving a token')
  }
  // 3
  return {
    token,
    user
  }
}

module.exports = {
  signup,
  login,
  post,
  stats
}
