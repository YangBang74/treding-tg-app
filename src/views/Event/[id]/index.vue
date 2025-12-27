<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Icons from '@/components/shared/Icons.vue'
import Info from '@/components/shared/Info.vue'
import TaskCard from '@/views/Event/ui/TaskCard.vue'
import ghoImage from '@/assets/images/gho.png'

// Пример данных для задач
const tasks = [
  {
    id: 1,
    avatar: ghoImage,
    title: 'My Friend',
    description: 'Пригласите 1 друга',
    current: 1,
    target: 1,
    reward: '5 Tickets',
  },
  {
    id: 2,
    avatar: ghoImage,
    title: 'Hi Friend',
    description: 'Пригласите 5 друзей',
    current: 4,
    target: 5,
    reward: '5 Tickets',
  },
  {
    id: 3,
    avatar: ghoImage,
    title: 'Первое выполнение',
    description: 'Пригласите 5 друзей',
    current: 0,
    target: 1,
    reward: '5 Ticket',
  },
]
</script>

<template>
  <div class="p-4 space-y-5">
    <div>
      <div class="flex items-center justify-center gap-2.5">
        <Icons name="time" :size="16" color="white" />
        <p class="text-[1.75rem] font-semibold">10d, 19h:54m:12s</p>
      </div>
      <p class="text-sm text-[#9CA3AF] font-medium text-center">до завершения ивента осталось:</p>
    </div>
    <div class="bg-linear-to-b from-black/20 to-white/10 rounded-[0.875rem] p-5 py-7">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.25">
          <p class="text-xl font-medium">Referal boom</p>
          <Info text="SOME SOME SOME" :size="16" />
        </div>
        <div
          class="bg-[#22C55E]/10 py-2 h-9 text-[#22C55E] text-xs gap-1.25 flex items-center px-3.5 rounded-[1.875rem]"
        >
          <Icons name="dot" :size="12" color="#22C55E" />
          Active
        </div>
      </div>
      <p class="text-sm text-[#9CA3AF] font-medium max-w-60.75 mt-1.25 mb-2.5">
        Выполняйте задания и получите долю от призового фонда
      </p>
      <div class="bg-white/4 py-2.5 px-4 rounded-[0.875rem]">
        <p class="text-xs text-[#9CA3AF] font-medium">Призовой фонд</p>
        <p class="font-medium">$2000.00</p>
      </div>
      <div class="bg-white/4 py-2.5 px-4 rounded-[0.875rem] my-2.5">
        <p class="text-xs text-[#9CA3AF] font-medium">Ваша доля от пула</p>
        <p class="font-medium">6.36%</p>
      </div>
      <div class="bg-white/4 py-2.5 px-4 rounded-[0.875rem]">
        <p class="text-xs text-[#9CA3AF] font-medium">Количество тикетов</p>
        <div class="flex items-center gap-1.25 font-medium">
          <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.22016 8.02252C4.2193 7.92708 4.18079 7.83585 4.113 7.76868C4.04522 7.7015 3.95364 7.66381 3.85821 7.66381C3.76277 7.66381 3.6712 7.7015 3.60342 7.76868C3.53563 7.83585 3.49712 7.92708 3.49626 8.02252V9.83913C3.49583 9.88693 3.50487 9.93435 3.52287 9.97864C3.54087 10.0229 3.56746 10.0632 3.60111 10.0972C3.63477 10.1311 3.67481 10.1581 3.71894 10.1765C3.76307 10.1949 3.8104 10.2043 3.85821 10.2043C3.90602 10.2043 3.95335 10.1949 3.99748 10.1765C4.0416 10.1581 4.08165 10.1311 4.1153 10.0972C4.14896 10.0632 4.17555 10.0229 4.19355 9.97864C4.21154 9.93435 4.22059 9.88693 4.22016 9.83913V8.02252ZM0.620098 4.65997H3.49626V6.50215C3.49583 6.54996 3.50487 6.59738 3.52287 6.64167C3.54087 6.68596 3.56746 6.72625 3.60111 6.7602C3.63477 6.79416 3.67481 6.82111 3.71894 6.83951C3.76307 6.8579 3.8104 6.86737 3.85821 6.86737C3.90602 6.86737 3.95335 6.8579 3.99748 6.83951C4.0416 6.82111 4.08165 6.79416 4.1153 6.7602C4.14896 6.72625 4.17555 6.68596 4.19355 6.64167C4.21154 6.59738 4.22059 6.54996 4.22016 6.50215V4.65997H14.358C14.5222 4.66004 14.6797 4.72533 14.7959 4.84148C14.912 4.95763 14.9773 5.11514 14.9774 5.27939V6.84255L14.8748 6.88421C14.4674 7.04941 14.1185 7.33244 13.8729 7.69707C13.6273 8.0617 13.4961 8.49133 13.4961 8.93097C13.4961 9.3706 13.6273 9.80024 13.8729 10.1649C14.1185 10.5295 14.4674 10.8125 14.8748 10.9777L14.9774 11.0194V12.5824C14.9773 12.7467 14.912 12.9042 14.7959 13.0203C14.6797 13.1365 14.5222 13.2018 14.358 13.2019H4.22016V11.3595C4.22059 11.3117 4.21154 11.2643 4.19355 11.22C4.17555 11.1757 4.14896 11.1354 4.1153 11.1015C4.08165 11.0675 4.0416 11.0406 3.99748 11.0222C3.95335 11.0038 3.90602 10.9943 3.85821 10.9943C3.8104 10.9943 3.76307 11.0038 3.71894 11.0222C3.67481 11.0406 3.63477 11.0675 3.60111 11.1015C3.56746 11.1354 3.54087 11.1757 3.52287 11.22C3.50487 11.2643 3.49583 11.3117 3.49626 11.3595V13.2019H0.619307C0.455073 13.2017 0.297622 13.1364 0.181514 13.0202C0.0654046 12.904 0.000124061 12.7466 0 12.5823V11.0193L0.102539 10.9776C0.509361 10.8116 0.857632 10.5283 1.10309 10.1639C1.34854 9.79944 1.4801 9.37024 1.48105 8.93084C1.48006 8.49146 1.34849 8.0623 1.10303 7.69788C0.85758 7.33345 0.509331 7.05023 0.102539 6.88418L0 6.8425V5.27939C0.000114542 5.11555 0.0650915 4.95842 0.180725 4.84236C0.296359 4.72629 0.453244 4.66072 0.61708 4.66L0.620098 4.65997ZM13.6852 0.0352496C13.8399 -0.0192397 14.01 -0.0102746 14.1582 0.0601877C14.3064 0.13065 14.4207 0.256886 14.4762 0.411334L15 1.88388L14.9173 1.95753C14.6662 2.18268 14.4696 2.46195 14.3423 2.77425C14.215 3.08655 14.1604 3.4237 14.1826 3.7602L14.1945 3.93598H2.71723L13.6852 0.0352496Z"
              fill="white"
            />
          </svg>
          35
        </div>
      </div>
    </div>

    <!-- Список задач -->
    <div class="space-y-3">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :avatar="task.avatar"
        :title="task.title"
        :description="task.description"
        :current="task.current"
        :target="task.target"
        :reward="task.reward"
      />
    </div>
  </div>
</template>
