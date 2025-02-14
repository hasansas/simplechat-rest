/**
 * Mail
 */

'use strict'

import nodemailer from 'nodemailer'
import handlebars from 'handlebars'

export const sendMail = async function (mailTo, mailTemplate, mailData) {
  const emailTemplateModel = DB.emailTemplates
  const _mailTemplate = await emailTemplateModel.findOne({ where: { name: mailTemplate } })

  if (_mailTemplate != null) {
    const _config = {
      host: ENV.MAIL_HOST,
      port: ENV.MAIL_PORT,
      auth: {
        user: ENV.MAIL_USERNAME,
        pass: ENV.MAIL_PASSWORD
      },
      connectionTimeout: 30000
      // greetingTimeout: 1000,
      // debug: true
    }

    try {
      // create transporter
      const transporter = nodemailer.createTransport(_config)

      // mail options
      const renderContentText = handlebars.compile(_mailTemplate.contentText)
      const contentText = renderContentText(mailData)
      const renderContentHtml = handlebars.compile(_mailTemplate.contentHtml)
      const contentHtml = renderContentHtml(mailData)

      const mailOptions = {
        from: {
          name: _mailTemplate.fromName,
          address: _mailTemplate.from
        },
        to: mailTo,
        subject: _mailTemplate.subject,
        text: contentText,
        html: contentHtml
      }
      await transporter.sendMail(mailOptions)

      // const sendMail = await transporter.sendMail(mailOptions)
      // console.log('Message sent: %s', sendMail.messageId)

      return true
    } catch (err) {
      return false
    }
  }
}

export const sendMessage = async function ({ to, body, subject = '', from = null, fromName = null, variables, options = null }) {
  const _config = {
    host: options !== null ? options.host : ENV.MAILBLAST_HOST,
    port: options !== null ? options.port : ENV.MAILBLAST_PORT,
    auth: {
      user: options !== null ? options.userName : ENV.MAILBLAST_USERNAME,
      pass: options !== null ? options.password : ENV.MAILBLAST_PASSWORD
    },
    connectionTimeout: 30000
    // greetingTimeout: 1000,
    // debug: true
  }

  try {
    // create transporter
    const transporter = nodemailer.createTransport(_config)

    // mail options
    const renderContentHtml = handlebars.compile(body)
    const _contentHtml = renderContentHtml(variables)
    const _from = options !== null ? options.from : from || ENV.MAILBLAST_FROM
    const _fromName = options !== null ? options.fromName : fromName || ENV.MAILBLAST_FROM_NAME

    const mailOptions = {
      from: {
        name: _fromName,
        address: _from
      },
      to: to,
      subject: subject,
      html: _contentHtml
    }
    await transporter.sendMail(mailOptions)
    // const sendMail = await transporter.sendMail(mailOptions)
    // console.log('Message sent: %s', sendMail.messageId)

    return { success: true }
  } catch (err) {
    return { success: false, error: err?.message }
  }
}

const mail = {
  send: sendMail,
  sendMessage: sendMessage
}

export default mail
