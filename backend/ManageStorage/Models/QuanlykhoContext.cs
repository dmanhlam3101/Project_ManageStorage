using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ManageStorage.Models
{
    public partial class QuanlykhoContext : DbContext
    {
        public QuanlykhoContext()
        {
        }

        public QuanlykhoContext(DbContextOptions<QuanlykhoContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<InputStorage> InputStorages { get; set; } = null!;
        public virtual DbSet<OutputStorage> OutputStorages { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Supplier> Suppliers { get; set; } = null!;
        public virtual DbSet<Unit> Units { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("server=localhost\\SQLEXPRESS;database=Quanlykho;Integrated security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.Address)
                    .HasMaxLength(50)
                    .HasColumnName("address");

                entity.Property(e => e.ContractDate)
                    .HasColumnType("datetime")
                    .HasColumnName("contractDate");

                entity.Property(e => e.DisplayName)
                    .HasMaxLength(50)
                    .HasColumnName("displayName");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.MoreInfo)
                    .HasMaxLength(255)
                    .HasColumnName("moreInfo");

                entity.Property(e => e.Phone)
                    .HasMaxLength(50)
                    .HasColumnName("phone");

                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<InputStorage>(entity =>
            {
                entity.HasKey(e => e.InputId);

                entity.ToTable("InputStorage");

                entity.Property(e => e.InputId).HasColumnName("inputId");

                entity.Property(e => e.DateInput)
                    .HasColumnType("datetime")
                    .HasColumnName("dateInput");

                entity.Property(e => e.InputPrice).HasColumnName("inputPrice");

                entity.Property(e => e.OutputPrice).HasColumnName("outputPrice");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.InputStorages)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_InputStorage_Product");
            });

            modelBuilder.Entity<OutputStorage>(entity =>
            {
                entity.HasKey(e => e.OutputId);

                entity.ToTable("OutputStorage");

                entity.Property(e => e.OutputId).HasColumnName("outputId");

                entity.Property(e => e.CustomerId).HasColumnName("customerId");

                entity.Property(e => e.DateOutput)
                    .HasColumnType("datetime")
                    .HasColumnName("dateOutput");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.OutputStorages)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK_OutputStorage_Customer");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OutputStorages)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK_OutputStorage_Product");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.ProductId).HasColumnName("productId");

                entity.Property(e => e.ProductName)
                    .HasMaxLength(50)
                    .HasColumnName("productName");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.SupplierId).HasColumnName("supplierId");

                entity.Property(e => e.UnitId).HasColumnName("unitId");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("FK_Product_Supplier");

                entity.HasOne(d => d.Unit)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.UnitId)
                    .HasConstraintName("FK_Product_Unit");
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.ToTable("Supplier");

                entity.Property(e => e.SupplierId).HasColumnName("supplierId");

                entity.Property(e => e.Address)
                    .HasMaxLength(50)
                    .HasColumnName("address");

                entity.Property(e => e.ContractDate)
                    .HasColumnType("datetime")
                    .HasColumnName("contractDate");

                entity.Property(e => e.DisplayName)
                    .HasMaxLength(50)
                    .HasColumnName("displayName");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.MoreInfo)
                    .HasMaxLength(255)
                    .HasColumnName("moreInfo");

                entity.Property(e => e.Phone)
                    .HasMaxLength(50)
                    .HasColumnName("phone");

                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<Unit>(entity =>
            {
                entity.ToTable("Unit");

                entity.Property(e => e.UnitId).HasColumnName("unitId");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.UnitName)
                    .HasMaxLength(50)
                    .HasColumnName("unitName");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).HasColumnName("userId");

                entity.Property(e => e.DisplayName)
                    .HasMaxLength(50)
                    .HasColumnName("displayName");

                entity.Property(e => e.Password)
                    .HasMaxLength(50)
                    .HasColumnName("password");

                entity.Property(e => e.Role)
                    .HasMaxLength(50)
                    .HasColumnName("role");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.Username)
                    .HasMaxLength(50)
                    .HasColumnName("username");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
