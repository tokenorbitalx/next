'use client'

import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { saveSaleRecord } from '@/utils/history'

export default function WLDTransferGenerator() {
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    lastname: '',
    phone: '',
    city: '',
    email: '',
    account: '',
    paymentMethod: 'paypal'
  })
  const [finalAmount, setFinalAmount] = useState('Aún no calculado.')
  const [generatedUrl, setGeneratedUrl] = useState('Aún no generada.')
  const [showWhatsApp, setShowWhatsApp] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const getWldPrice = async () => {
    const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=WLDUSDT')
    const data = await response.json()
    return parseFloat(data.price)
  }

  const generateTransferUrl = async () => {
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert("Por favor, ingresa una cantidad válida en WLD.")
      return
    }

    const wldPrice = await getWldPrice()
    const usdAmount = wldPrice * parseFloat(formData.amount)
    const colombianPesoRate = 4500
    const amountInCOP = (usdAmount * colombianPesoRate).toFixed(2)
    const discountedAmount = (parseFloat(amountInCOP) * 0.84).toFixed(2)
    setFinalAmount(`${discountedAmount} COP`)

    const amountWei = BigInt(parseFloat(formData.amount) * 1e18).toString()
    const transferUrl = `ethereum:pay-0x2cfc85d8e48f8eab294be644d9e25c3030863003@480/transfer?address=0x512e4a7dda6b13f917d89fa782bdd7666dab1599&uint256=${amountWei}`
    setGeneratedUrl(transferUrl)
    setShowWhatsApp(true)

    // Save the sale record
    saveSaleRecord({
      amount: parseFloat(formData.amount),
      tokenType: 'WLD',
      valueReceived: parseFloat(discountedAmount),
      paymentMethod: formData.paymentMethod,
      buyer: {
        name: `${formData.name} ${formData.lastname}`,
        phone: formData.phone,
        email: formData.email,
        account: formData.account,
        city: formData.city,
      },
      status: 'completed'
    });
  }

  const whatsappMessage = `*Formulario de Transferencia WLD:*\n\n` +
    `*Nombre:* ${formData.name} ${formData.lastname}\n` +
    `*Teléfono:* ${formData.phone}\n` +
    `*Ciudad:* ${formData.city}\n` +
    `*Correo:* ${formData.email}\n` +
    `*Cuenta:* ${formData.account}\n` +
    `*Método de Pago:* ${formData.paymentMethod}\n` +
    `*Cantidad de WLD:* ${formData.amount} WLD\n` +
    `*Valor a Recibir:* ${finalAmount}\n` +
    `*URL de Transferencia:* ${generatedUrl}`

  const whatsappLink = `https://wa.me/3248092374?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <form className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Cantidad en WLD:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.0001"
            min="0.0001"
            required
            placeholder="Ej. 0.5 WLD"
            value={formData.amount}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Tu nombre"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
            Apellidos:
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            required
            placeholder="Tus apellidos"
            value={formData.lastname}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Teléfono:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            required
            placeholder="Tu teléfono"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Ciudad:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            placeholder="Tu ciudad"
            value={formData.city}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Tu correo electrónico"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="account" className="block text-sm font-medium text-gray-700">
            Número de cuenta:
          </label>
          <input
            type="text"
            id="account"
            name="account"
            required
            placeholder="Tu número de cuenta"
            value={formData.account}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Método de pago:
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            required
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="paypal">Dale</option>
            <option value="Nequi">Nequi</option>
            <option value="Daviplata">Daviplata</option>
            <option value="Ahorro">Ahorro</option>
            <option value="Trasfiya">Trasfiya</option>
            <option value="nu">nu</option>
            <option value="Cuenta bancaria">Banco de bogota</option>
            <option value="bankTransfer">Transferencia Bancaria</option>
            <option value="crypto">ORBITAL-X</option>
          </select>
        </div>

        <button
          type="button"
          onClick={generateTransferUrl}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Generar Transferencia
        </button>
      </form>

      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Valor a Recibir (en Pesos Colombianos):</h3>
          <p className="mt-2 text-xl font-semibold text-blue-600">{finalAmount}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">URL Generada:</h3>
          <p className="mt-2 p-4 bg-gray-50 rounded-md font-mono text-sm break-all">{generatedUrl}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">Código QR de la Transferencia:</h3>
          <div className="mt-4 flex justify-center">
            {generatedUrl !== 'Aún no generada.' && (
              <QRCodeSVG value={generatedUrl} size={200} />
            )}
          </div>
        </div>

        {showWhatsApp && (
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900">Enviar a WhatsApp:</h3>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Enviar a WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

