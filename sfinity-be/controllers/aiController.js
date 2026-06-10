import Transaction from "../models/TransactionModel.js";
import User from "../models/UserModel.js";

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GET AI PREDICTION & RECOMMANDATION (FE -> BE -> AI)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
export const getAIPrediction = async (req, res) => {
  try {
    const {
      usia,
      gender,
      year_in_school,
      major,
      preferred_payment_method
    } = req.body;

    // Validate demographic inputs
    if (!usia || !gender || !year_in_school || !major || !preferred_payment_method) {
      return res.status(400).json({
        success: false,
        message: "Semua data demografis (usia, gender, tahun sekolah, jurusan, metode pembayaran) wajib diisi."
      });
    }

    // Fetch user details for the name
    const user = await User.findById(req.user._id);
    const namaUser = user ? user.name : "User";

    // Query all transactions for this user
    const transactions = await Transaction.find({
      user: req.user._id,
    }).populate("category", "name");

    // Filter current month transactions
    const now = new Date();
    const currentMonthTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return (
        tDate.getMonth() === now.getMonth() &&
        tDate.getFullYear() === now.getFullYear()
      );
    });

    // Initialize category amounts
    let pendapatan = 0;
    let bantuan = 0;
    let pendidikan = 0;
    let tempat_tinggal = 0;
    let makanan = 0;
    let transportasi = 0;
    let buku = 0;
    let hiburan = 0;
    let perawatan = 0;
    let teknologi = 0;
    let kesehatan = 0;
    let lainnya = 0;

    // Aggregate category amounts
    currentMonthTransactions.forEach((t) => {
      const categoryName = t.category?.name ? t.category.name.toLowerCase().trim() : "";
      const amount = Number(t.amount) || 0;

      if (t.type === "income") {
        if (categoryName === "beasiswa") {
          bantuan += amount;
        } else {
          pendapatan += amount;
        }
      } else if (t.type === "expense") {
        switch (categoryName) {
          case "tuition":
            pendidikan += amount;
            break;
          case "housing":
            tempat_tinggal += amount;
            break;
          case "food":
            makanan += amount;
            break;
          case "transportation":
            transportasi += amount;
            break;
          case "books & supplies":
            buku += amount;
            break;
          case "entertainment":
            hiburan += amount;
            break;
          case "personal care":
            perawatan += amount;
            break;
          case "technology":
            teknologi += amount;
            break;
          case "health & wellness":
            kesehatan += amount;
            break;
          case "miscellaneous":
          default:
            lainnya += amount;
            break;
        }
      }
    });

    // Construct request body for FastAPI AI Service
    const aiPayload = {
      usia: Number(usia),
      gender: gender,
      year_in_school: year_in_school,
      major: major,
      preferred_payment_method: preferred_payment_method,
      pendapatan: Number(pendapatan),
      bantuan: Number(bantuan),
      pendidikan: Number(pendidikan),
      tempat_tinggal: Number(tempat_tinggal),
      makanan: Number(makanan),
      transportasi: Number(transportasi),
      buku: Number(buku),
      hiburan: Number(hiburan),
      perawatan: Number(perawatan),
      teknologi: Number(teknologi),
      kesehatan: Number(kesehatan),
      lainnya: Number(lainnya),
      nama: namaUser
    };

    console.log("Sending payload to AI service:", aiPayload);

    // Call FastAPI AI service running on localhost:8000 (or configured domain)
    const aiBaseUrl = process.env.AI_SERVICE_URL || "https://sfinity-ai.onrender.com";
    const aiResponse = await fetch(`${aiBaseUrl}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(aiPayload)
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(`AI Service Error (Status ${aiResponse.status}): ${errorText}`);
    }

    const aiData = await aiResponse.json();

    res.json({
      success: true,
      data: aiData
    });

  } catch (error) {
    console.error("Error in getAIPrediction:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memproses prediksi AI.",
      error: error.message
    });
  }
};
