import prisma from '../../../shared/prisma';

const postReview = async (data: any) => {
  const { customerEmail, rating, comment } = data;
  const customer = await prisma.customer.findFirst({
    where: { email: customerEmail },
  });
  if (customer) {
    const previousReview = await prisma.reviews.findFirst({
      where: { customerId: customer?.id },
    });
    if (previousReview) {
      const result = await prisma.reviews.update({
        where: { customerId: customer?.id },
        data: {
          rating: rating,
          comment: comment,
        },
      });
      return result;
    } else {
      const submitData = {
        customerEmail,
        customerId: customer?.id,
        rating,
        comment,
      };
      const result = await prisma.reviews.create({ data: submitData });
      return result;
    }
  }
  return '';
};

const getMyReview = async (email: string) => {
  const result = await prisma.reviews.findFirst({
    where: { customerEmail: email },
  });
  return result;
};

const getAllReview = async () => {
  const result = await prisma.reviews.findMany({ include: { customer: true } });
  return result;
};

export const ReviewServices = {
  postReview,
  getMyReview,
  getAllReview,
};
