'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import type { IWebTrainingPlan } from '@/types'

export type { IWebTrainingPlan }

interface DetailPlanPostProps {
  webTrainingPlans: IWebTrainingPlan[]
  isVN: boolean
}

function formatTime(iso: string | undefined): string {
  if (!iso) return '--:--'
  const d = new Date(iso)
  return d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

function formatDateLabel(iso: string | undefined, isVN: boolean): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isVN) {
    return d.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function DetailPlanPost({ webTrainingPlans, isVN }: DetailPlanPostProps) {
  const plans = webTrainingPlans ?? []
  const [activeIndex, setActiveIndex] = useState(0)
  const activePlan = plans[activeIndex]
  const agendas = activePlan?.planTimeAgendas ?? []

  if (plans.length === 0) return null

  const title = isVN ? 'Lịch trình' : 'Workshop Agenda'

  return (
    <section className='mt-14 max-w-7xl mx-auto px-4 sm:px-6'>
      {/* Title + subtitle (như ảnh: title lớn đen, subtitle xanh nhỏ) */}
      <h2 className='text-2xl sm:text-3xl font-bold text-black tracking-tight'>{title}</h2>
      <p className='mt-1 text-emerald-600 text-sm font-medium'>
        {isVN ? `Chủ đề: ${activePlan.name_vn}` : `Focus: ${activePlan.name_en}`}
      </p>
      <p className='mt-1 text-black text-sm'>
        {isVN ? 'Chọn ngày bên dưới để xem chi tiết' : 'Select a day below to view the schedule'}
      </p>

      {/* Day tabs (như ảnh: Day 1 active = nền xanh chữ trắng viền đen, Day 2 = nền trắng chữ đen viền đen) */}
      <div className='flex flex-wrap gap-2 mt-6 border-b border-black pb-3'>
        {plans.map((plan, i) => (
          <button
            key={plan.web_training_plan_id ?? i}
            type='button'
            onClick={() => setActiveIndex(i)}
            className={
              'px-5 py-2.5 rounded-lg text-sm font-semibold border-2 transition-colors ' +
              (activeIndex === i
                ? 'bg-emerald-600 text-white border-black cursor-pointer'
                : 'bg-white text-black border-black hover:bg-gray-50 cursor-pointer')
            }
          >
            <span className='opacity-90 text-lg font-bold'>{formatDateLabel(plan.date, isVN)}</span>
          </button>
        ))}
      </div>

      {/* Card: trái = khối Focus xanh (bo góc trái), phải = danh sách agenda */}
      <div className='mt-6 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-0 bg-white rounded-2xl overflow-hidden md:items-start'>
        {/* Left: Focus block (xanh đậm, bo góc trái, không kéo dài) */}
        <aside className='bg-gradient-to-b from-emerald-800 to-emerald-700 text-white p-5 md:p-6 min-h-[100px] md:min-h-0 md:self-start rounded-t-2xl md:rounded-t-none md:rounded-l-2xl'>
          <p className='uppercase tracking-widest text-xs font-bold opacity-80'>{isVN ? 'Chủ đề' : 'Focus'}</p>
          <p className='mt-2 text-lg font-bold leading-snug'>{isVN ? activePlan?.name_vn : activePlan?.name_en}</p>
        </aside>

        {/* Right: agenda list (time | gạch dọc | title + mô tả + speaker) */}
        <main className='border-l border-b border-black'>
          {agendas.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-16 px-6 text-gray-500 text-sm'>
              {isVN ? 'Chưa có nội dung chi tiết cho ngày này.' : 'No agenda items for this day.'}
            </div>
          ) : (
            <ul className='ml-0'>
              {agendas.map((item, j) => (
                <li
                  key={item.web_training_plan_detail_id ?? j}
                  className='flex gap-0 border-b border-black ml-0 last:border-b-0'
                >
                  {/* Cột giờ + gạch dọc */}
                  <div className='flex shrink-0 w-28 sm:w-32 py-5 pl-5 pr-4 border-r border-black'>
                    <p className='text-sm font-semibold text-gray-800 tabular-nums'>
                      {formatTime(item.time_start)} – {formatTime(item.time_end)}
                    </p>
                  </div>

                  {/* Nội dung: title (in đậm đen) + mô tả (xanh nhạt) + speaker (ảnh + tên + chức danh) */}
                  <div className='flex flex-row gap-3'>
                    <div className='flex-1 min-w-0 py-5 pr-5 pl-5 sm:pl-6'>
                      {item.web_speaker && (
                        <div className='mt-3 flex items-center gap-3'>
                          {item.web_speaker.image_url && (
                            <Image
                              src={item.web_speaker.image_url}
                              alt={item.web_speaker.name_speaker ?? ''}
                              width={40}
                              height={40}
                              className='min-w-40 min-h-40 rounded-2xl object-cover border border-black shrink-0 hidden sm:block'
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='flex-1 min-w-0 py-5 pr-5 pl-5 sm:pl-6'>
                    <div className='flex flex-wrap items-start gap-3'>
                      <h3 className='text-base sm:text-lg font-bold text-black'>
                        {isVN ? item.name_vn : item.name_en}
                      </h3>
                    </div>
                    {(item.content_agenda_vn || item.content_agenda_en) && (
                      <p className='mt-2 text-sm text-emerald-700 leading-relaxed whitespace-pre-line'>
                        {isVN ? item.content_agenda_vn : item.content_agenda_en}
                      </p>
                    )}
                    {item.web_speaker && (
                      <div className='min-w-0'>
                        <p className='font-semibold text-gray-900 text-sm'>{item.web_speaker.name_speaker}</p>
                        {item.web_speaker.degree_speaker && (
                          <p className='text-xs text-gray-600'>{item.web_speaker.degree_speaker}</p>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </section>
  )
}
