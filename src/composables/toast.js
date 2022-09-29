import { ref, onUnmounted } from "vue";
export const useToast = () => {
  // 안내창 보이고 숨기는 변수
  const showToast = ref(false);
  // 안내창 보여질 내용
  const toastMessage = ref("");
  // 안내창 타입 종류
  const toastType = ref("");
  // 타이머 식별자
  const toastTimer = ref(null);
  // 안내창 실행 메소드
  const triggerToast = (message, color = "success") => {
    toastMessage.value = message;
    toastType.value = color;
    showToast.value = true;
    toastTimer.value = setTimeout(() => {
      toastMessage.value = "";
      toastType.value = "";
      showToast.value = false;
    }, 3000);
  };
  // 컴포넌트 이동으로 인하여 화면에서 제거 완료시 실행
  onUnmounted(() => {
    clearTimeout(toastTimer.value);
  });

  return {
    showToast,
    toastType,
    toastMessage,
    triggerToast,
  };
};
