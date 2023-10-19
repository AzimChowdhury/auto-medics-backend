import prisma from '../../../shared/prisma';

const createPublicNotification = async (data: any) => {
  const { title, details } = data;
  const result = await prisma.publicNotification.create({
    data: { title, details },
  });
  return result;
};

const getMyNotification = async (email: string) => {
  const result1 = await prisma.publicNotification.findMany();
  const result2 = await prisma.myNotification.findMany({ where: { email } });
  const finalResult = [...result1, ...result2];
  const sortedResult = finalResult.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return sortedResult;
};

const updateNotification = async (data: any) => {
  const { email, notificationId } = data;
  const myNotification = await prisma.myNotification.findFirst({
    where: { id: notificationId },
  });
  if (myNotification) {
    const result = await prisma.myNotification.update({
      where: { id: notificationId },
      data: { readen: true },
    });
    return result;
  } else {
    const publicNotification = await prisma.publicNotification.findFirst({
      where: { id: notificationId },
    });
    if (publicNotification) {
      const result = await prisma.publicNotification.update({
        where: { id: notificationId },
        data: {
          readers: {
            push: email,
          },
        },
      });
      return result;
    }
  }
};

export const NotificationServices = {
  createPublicNotification,
  getMyNotification,
  updateNotification,
};
